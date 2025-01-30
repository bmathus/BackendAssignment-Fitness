import Joi from 'joi';
import { ROLE } from '../utils/enums';
import { Request } from 'express';
import validationMessages from '../utils/validation-messages';

// User registration body validator
export const userCreateValidator = (req: Request) =>
  Joi.object({
    name: Joi.string().max(100).messages(validationMessages(req, 'Name', '100')),
    surname: Joi.string().max(100).messages(validationMessages(req, 'Surname', '100')),
    nickName: Joi.string().max(50).messages(validationMessages(req, 'Nickname', '50')),
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
      .max(150)
      .messages(validationMessages(req, 'Age', '150', '1')),
    role: Joi.string()
      .valid(...Object.values(ROLE))
      .required()
      .messages(validationMessages(req, 'Role')),
  });

// Login validator
export const emailPasswordValidator = (req: Request) =>
  Joi.object({
    email: Joi.string().max(150).required().messages(validationMessages(req, 'Email', '150')),
    password: Joi.string()
      .max(64)
      .required()
      .messages(validationMessages(req, 'Password', '64', '')),
  });

// User update body validator
export const userUpdateValidator = (req: Request) =>
  Joi.object({
    name: Joi.string().max(100).messages(validationMessages(req, 'Name', '100')),
    surname: Joi.string().max(100).messages(validationMessages(req, 'Surname', '100')),
    nickName: Joi.string().max(50).messages(validationMessages(req, 'Nickname', '50')),
    age: Joi.number()
      .integer()
      .min(1)
      .max(150)
      .messages(validationMessages(req, 'Age', '150', '1')),
    role: Joi.string()
      .valid(...Object.values(ROLE))
      .messages(validationMessages(req, 'Role')),
  })
    .or('name', 'surname', 'nickName', 'age', 'role') // At least one field is required to be suplied in body for PATCH
    .messages({
      'object.missing': req.__('validation.at_least_one_field', {
        field: 'name, surname, nickName, age, role',
      }),
    });
