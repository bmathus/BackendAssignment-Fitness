import Joi from 'joi';

export const idParamValidator = (req: any) =>
  Joi.object({
    id: numberValidation('ID parameter', req),
  });

export const numberValidation = (field: string, req: any) =>
  Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': req.__('validation.number_base', { field }),
      'number.positive': req.__('validation.positive', { field }),
      'any.required': req.__('validation.required', { field }),
    });
