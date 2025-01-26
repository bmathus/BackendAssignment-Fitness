import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import i18n from '../config/i18n';

/**
 * Middleware for validating request data.
 * @param schemaBuilder - Function to build Joi schema dynamically.
 */
const validationMiddleware = (schemaBuilder: (req: Request) => Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = schemaBuilder(req);

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(400).json({
        data: {},
        message: error.details.map((detail) => detail.message), // Use localized messages
      });
    }
    req.body = value; // Update the body with stripped fields

    // if (schema.query) {
    //   const { error, value } = schema.query.validate(req.query, {
    //     stripUnknown: true,
    //   });
    //   if (error) {
    //     return res.status(400).json({ message: error.details[0].message });
    //   }
    //   req.query = value; // Update the query with stripped fields
    // }

    // if (schema.params) {
    //   const { error, value } = schema.params.validate(req.params, {
    //     stripUnknown: true,
    //   });
    //   if (error) {
    //     return res.status(400).json({ message: error.details[0].message });
    //   }
    //   req.params = value; // Update the params with stripped fields
    // }

    next();
  };
};

export default validationMiddleware;
