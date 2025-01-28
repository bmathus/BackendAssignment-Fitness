import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';
import { UserAdd } from '../types/user';

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
    // Email and nick name must be unique
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        data: {},
        message: req.__('user.duplicate', {
          field: err.errors[0].path,
        }),
      });
    }

    console.error('Error in register handler:', err);

    res.status(500).json({
      data: {},
      message: req.__('errors.internal_error'),
    });
  }
}
