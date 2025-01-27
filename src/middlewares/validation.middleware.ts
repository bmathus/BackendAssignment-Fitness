import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

/**
 * Middleware for validating request data.
 * @param schemaBuilder - Validator function to build Joi schema messages dynamically based on localization
 */
const validationMiddleware = (schemaBuilders: {
  body?: (req: Request) => Schema;
  params?: (req: Request) => Schema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemaBuilders.body) {
      const { error, value } = schemaBuilders.body(req).validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        return res.status(400).json({
          data: {},
          message: error.details.map((detail) => detail.message),
        });
      }
      req.body = value; // Update body with stripped fields
    }

    // Validate params
    if (schemaBuilders.params) {
      const { error, value } = schemaBuilders.params(req).validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });
      if (error) {
        return res.status(400).json({
          data: {},
          message: error.details.map((detail) => detail.message),
        });
      }
      req.params = value; // Update params
    }

    next();
  };
};

export default validationMiddleware;
