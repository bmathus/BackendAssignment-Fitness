import Joi from 'joi';
import { EXERCISE_DIFFICULTY } from '../utils/enums';

// Dynamic messages for name validation based on localization
const nameValidation = (req: any) =>
  Joi.string()
    .max(200)
    .messages({
      'string.base': req.__('validation.string_base', { field: 'Name' }),
      'string.empty': req.__('validation.string_empty', { field: 'Name' }),
      'string.max': req.__('validation.string_max', {
        field: 'Name',
        max: '200',
      }),
      'any.required': req.__('validation.required', { field: 'Name' }),
    });

// Dynamic messages for difficulty validation based on localization
const difficultyValidation = (req: any) =>
  Joi.string()
    .valid(...Object.values(EXERCISE_DIFFICULTY))
    .messages({
      'string.base': req.__('validation.string_base', { field: 'Difficulty' }),
      'any.only': req.__('validation.any_only', {
        field: 'Difficulty',
        values: Object.values(EXERCISE_DIFFICULTY).join(', '),
      }),
      'string.empty': req.__('validation.string_empty', {
        field: 'Difficulty',
      }),
      'any.required': req.__('validation.required', { field: 'Difficulty' }),
    });

export const exerciseCreateValidator = (req: any) =>
  Joi.object({
    name: nameValidation(req).required(),
    difficulty: difficultyValidation(req).required(),
  });

export const updateExerciseValidator = (req: any) =>
  Joi.object({
    name: nameValidation(req).optional(), // Optional for updates
    difficulty: difficultyValidation(req).optional(), // Optional for updates
  })
    .or('name', 'difficulty') // At least one field is required
    .messages({
      'object.missing': req.__('validation.at_least_one_field'),
    });
