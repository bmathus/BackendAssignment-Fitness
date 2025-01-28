import Joi from 'joi';
import { ROLE } from '../utils/enums';
import { Request } from 'express';
import validationMessages from '../utils/validationMessages';

export const userCreateValidator = (req: Request) =>
  Joi.object({
    name: Joi.string()
      .max(100)
      .messages(validationMessages(req, 'Name', '100')),
    surname: Joi.string()
      .max(100)
      .messages(validationMessages(req, 'Surname', '100')),
    nickName: Joi.string()
      .max(50)
      .messages(validationMessages(req, 'Nickname', '50')),
    email: Joi.string()
      .max(150)
      .email()
      .required()
      .messages(validationMessages(req, 'Email', '150')),
    password: Joi.string()
      .min(8)
      .max(64)
      .pattern(/[0-9]/, 'number') // At least one digit
      .required()
      .messages({
        ...validationMessages(req, 'Password', '64', '8'),
        'string.pattern.name': req.__('validation.one_digit', {
          field: 'Password',
        }),
      }),
    age: Joi.number()
      .integer()
      .min(1)
      .messages(validationMessages(req, 'Age', '', '1')),
    role: Joi.string()
      .valid(...Object.values(ROLE))
      .required()
      .messages(validationMessages(req, 'Role')),
  });

export const emailPasswordValidator = (req: Request) =>
  Joi.object({
    email: Joi.string()
      .max(150)
      .required()
      .messages(validationMessages(req, 'Email', '150')),
    password: Joi.string()
      .max(64)
      .required()
      .messages(validationMessages(req, 'Password', '64', '')),
  });
