import Joi from 'joi';
import { EXERCISE_DIFFICULTY } from '../../utils/enums';

export const exerciseCreateValidator = (req: any) =>
  Joi.object({
    name: Joi.string()
      .max(200)
      .required()
      .messages({
        'string.base': req.__('validation.string_base', { field: 'Name' }),
        'string.empty': req.__('validation.string_empty', { field: 'Name' }),
        'string.max': req.__('validation.string_max', {
          field: 'Name',
          max: '200',
        }),
        'any.required': req.__('validation.required', { field: 'Name' }),
      }),
    difficulty: Joi.string()
      .valid(...Object.values(EXERCISE_DIFFICULTY))
      .required()
      .messages({
        'string.base': req.__('validation.string_base', {
          field: 'Difficulty',
        }),
        'any.only': req.__('validation.any_only', {
          field: 'Difficulty',
          values: Object.values(EXERCISE_DIFFICULTY).join(', '),
        }),
        'string.empty': req.__('validation.string_empty', {
          field: 'Difficulty',
        }),
        'any.required': req.__('validation.required', { field: 'Difficulty' }),
      }),
  });
