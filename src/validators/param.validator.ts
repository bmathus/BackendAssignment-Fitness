import Joi from 'joi';
import { Request } from 'express';

// Validator for single ID parameter like /exercise/:id
export const IDParamValidator = (req: Request) =>
  Joi.object({
    id: numberValidation('ID parameter', req),
  });

//Validator for programId and exerciseId parameters
export const ProgramIDExerciseIDValidador = (req: Request) =>
  Joi.object({
    programId: numberValidation('Program ID parameter', req),
    exerciseId: numberValidation('Exercise ID parameter', req),
  });

const numberValidation = (field: string, req: Request) =>
  Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': req.__('validation.number_base', { field }),
      'number.positive': req.__('validation.positive', { field }),
      'any.required': req.__('validation.required', { field }),
    });
