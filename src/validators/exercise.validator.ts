import Joi from 'joi';
import { EXERCISE_DIFFICULTY } from '../utils/enums';
import validationMessages from '../utils/validation-messages';
import { Request } from 'express';

export const exerciseCreateValidator = (req: Request) =>
  Joi.object({
    name: nameValidation(req).required(),
    difficulty: difficultyValidation(req).required(),
  });

export const updateExerciseValidator = (req: Request) =>
  Joi.object({
    name: nameValidation(req).optional(), // Optional for updates
    difficulty: difficultyValidation(req).optional(), // Optional for updates
  })
    .or('name', 'difficulty') // At least one field is required
    .messages({
      'object.missing': req.__('validation.at_least_one_field', {
        field: 'name, difficulty',
      }),
    });

export const exerciseQueryValidator = (req: Request) =>
  Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .messages(validationMessages(req, 'page query', '', '1')),
    limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .default(10)
      .messages(validationMessages(req, 'limit query', '50', '1')),
    programID: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages(validationMessages(req, 'programID query', '', '1')),
    search: Joi.string()
      .trim()
      .min(1)
      .optional()
      .messages(validationMessages(req, 'search query', '', '1')),
  });

// Dynamic messages for name validation based on localization
const nameValidation = (req: Request) =>
  Joi.string().max(200).messages(validationMessages(req, 'name', '200', ''));

// Dynamic messages for difficulty validation based on localization
const difficultyValidation = (req: Request) =>
  Joi.string()
    .valid(...Object.values(EXERCISE_DIFFICULTY))
    .messages({
      ...validationMessages(req, 'difficulty', '200', ''),
      'any.only': req.__('validation.any_only', {
        field: 'difficulty',
        values: Object.values(EXERCISE_DIFFICULTY).join(', '),
      }),
    });

export const completionRecordValidator = (req: Request) =>
  Joi.object({
    duration: Joi.number()
      .integer()
      .positive()
      .required()
      .messages(validationMessages(req, 'duration', '', '')),
    completedAt: Joi.string()
      .isoDate()
      .required()
      .messages(validationMessages(req, 'completedAt', '', '')),
  });
