import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';
import { UserAdd } from '../types/user';
import AppError from '../utils/error';

export async function register(req: Request, res: Response) {
  try {
    const userData: UserAdd = req.body;

    // Hash password and save user in db
    const newUser = await registerUser(userData);

    // Exclude password from response
    delete newUser.password;

    res.status(201).json({
      data: newUser,
      message: res.__('auth.register_success'),
    });
  } catch (err) {
    if (err instanceof AppError) {
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
