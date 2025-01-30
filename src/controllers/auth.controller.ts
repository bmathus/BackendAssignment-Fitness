import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { UserAdd } from '../types/user';
import AppError from '../utils/error';

export async function register(req: Request, res: Response) {
  try {
    const userData: UserAdd = req.body;

    // Hash password and save user in db
    const newUser = await authService.registerUser(userData);

    // We can already login user and generate token for him
    const token = authService.generateJWT(newUser.id);

    res.status(201).json({
      data: {
        user: newUser.toResponse(), // Exclude password, timestamps
        token: token,
      },
      message: res.__('auth.register_success'),
    });
  } catch (err) {
    if (err instanceof AppError) {
      // Email and nickName already used.
      return res.status(409).json({
        data: {},
        message: req.__(`auth.${err.errorType}`),
      });
    }
    console.error('Error in register handler:', err);
    res.status(500).json({
      data: {},
      message: req.__('errors.internal_error'),
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const token = await authService.authenticate(email, password);

    // Return JWT token on succesfull authentication
    res.status(200).json({
      data: {
        token: token,
      },
      message: req.__('auth.success'),
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(401).json({
        data: {},
        message: req.__('auth.invalid_credentials'),
      });
    }
    console.error('Error in login handler:', err);
    res.status(500).json({
      data: {},
      message: req.__('errors.internal_error'),
    });
  }
}

export default {
  login,
  register,
};
