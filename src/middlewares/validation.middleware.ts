import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

/**
 * Middleware for validating request params, body, query with Joi.
 * @param schemaBuilder - Validator function to build Joi schema with dynamic messages based on localization
 */
const validationMiddleware = (schemaBuilders: {
  body?: (req: Request) => Schema;
  params?: (req: Request) => Schema;
  query?: (req: Request) => Schema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate params
    if (schemaBuilders.params) {
      const { error, value } = schemaBuilders.params(req).validate(req.params, validationOptions);
      if (error) {
        return validationErrorResponce(res, error);
      }
      req.params = value; // Update params
    }

    // Validate query
    if (schemaBuilders.query) {
      const { error, value } = schemaBuilders.query(req).validate(req.query, validationOptions);
      if (error) {
        return validationErrorResponce(res, error);
      }
      req.query = value; // Update query
    }

    // Validate body
    if (schemaBuilders.body) {
      const { error, value } = schemaBuilders.body(req).validate(req.body, validationOptions);
      if (error) {
        return validationErrorResponce(res, error);
      }
      req.body = value; // Update body with stripped fields
    }

    next();
  };
};

const validationErrorResponce = (res: Response, error: Joi.ValidationError) => {
  return res.status(400).json({
    data: {},
    message: error.details.map((detail) => detail.message),
  });
};

const validationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

export default validationMiddleware;
