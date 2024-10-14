import { Joi, Segments } from 'celebrate';

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum;
  let remainder;

  sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export const customerCreateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    dateOfBirth: Joi.date().iso().required().messages({
      'date.format': 'date of birth must follow the format "(YYYY-MM-DD)"',
    }),
    cpf: Joi.string()
      .pattern(/^\d{11}$/)
      .required()
      .custom((value, helpers) => {
        if (!validateCPF(value)) {
          return helpers.error('any.invalid', { message: 'Invalid CPF' });
        }
        return value;
      })
      .messages({
        'string.pattern.base': 'CPF must be 11 digits without formatting',
      }),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\d{10,11}$/)
      .required()
      .messages({
        'string.pattern.base':
          'phone must be 10 or 11 digits without formatting',
      }),
  }),
};

export const customerUpdateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    dateOfBirth: Joi.date().iso().optional().messages({
      'date.format': 'date of birth must follow the format "(YYYY-MM-DD)"',
    }),
    cpf: Joi.string()
      .pattern(/^\d{11}$/)
      .optional()
      .custom((value, helpers) => {
        if (!validateCPF(value)) {
          return helpers.error('any.invalid', { message: 'Invalid CPF' });
        }
        return value;
      })
      .messages({
        'string.pattern.base': 'CPF must be 11 digits without formatting',
      }),
    email: Joi.string().email().optional(),
    phone: Joi.string()
      .pattern(/^\d{10,11}$/)
      .optional()
      .messages({
        'string.pattern.base':
          'phone must be 10 or 11 digits without formatting',
      }),
  }),
};
