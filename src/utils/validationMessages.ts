import { ROLE } from './enums';
import { Request } from 'express';

/**
 * Generates localized validation messages for Joi validation based on the field and constraints.
 *
 * @param req - The Express request object, used to access the localization function.
 * @param field - The name of the field being validated, used in the localized messages.
 * @param max - The maximum length or value constraint for the field (optional).
 * @param min - The minimum length or value constraint for the field (optional).
 * @returns An object containing localized validation messages for Joi schema rules.
 */
const validationMessages = (
  req: Request,
  field: string,
  max?: string,
  min?: string
) => ({
  'string.base': req.__('validation.string_base', { field }),
  'string.empty': req.__('validation.string_empty', { field }),
  'string.max': req.__('validation.string_max', { field, max }),
  'string.min': req.__('validation.string_min', { field, min }),
  'any.required': req.__('validation.required', { field }),
  'number.base': req.__('validation.number_base', { field }),
  'number.integer': req.__('validation.number_base', { field }),
  'number.min': req.__('validation.number_min', { field, min }),
  'number.max': req.__('validation.number_max', { field, max }),
  'number.positive': req.__('validation.positive', { field }),
  'string.email': req.__('validation.email'),
  'any.only': req.__('validation.any_only', {
    field,
    values: Object.values(ROLE).join(', '),
  }),
});
export default validationMessages;
