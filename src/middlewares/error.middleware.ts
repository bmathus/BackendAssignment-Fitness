import { Request, Response, NextFunction } from 'express';

// General error-handling middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log the error for debugging
  if (process.env.NODE_ENV === 'DEV') {
    console.error(err.stack);
  }

  // Handle errors
  res.status(err.status || 500).json({
    data: {},
    message: req.__('errors.internal_error'), // Localized error message
  });
};

export default errorHandler;
