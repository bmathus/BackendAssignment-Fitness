import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';

// Authentication middleware for securing routes
const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: any, user: any, info: any) => {
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
    }
  )(req, res, next);
};

export default authenticateJwt;
