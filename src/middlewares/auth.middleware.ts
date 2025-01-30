import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types/user';

// Authentication middleware for securing routes
export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      next(err); // pass the error to errorHandler middleware
    }

    // Handle token expiration
    if (info && info.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: req.__('auth.expired'),
      });
    }

    // Handle other token related error and and when user not found
    if (info || !user) {
      return res.status(401).json({
        message: req.__('auth.unauthorized'),
      });
    }

    // If user is authenticated, attach to req.user and proceed
    req.user = user;
    next();
  })(req, res, next);
};

export const roleCheck = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req.user as User).role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: req.__('auth.forbidden'),
      });
    }

    next();
  };
};
