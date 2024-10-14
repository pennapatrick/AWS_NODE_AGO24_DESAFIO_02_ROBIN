import { Joi, Segments } from 'celebrate';

export const userCreateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required().messages({
      'string.min':
        'Password must be at least 8 characters and at most 12 characters',
    }),
  }),
};

export const userUpdateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).max(12).optional().messages({
      'string.min':
        'Password must be at least 8 characters and at most 12 characters',
    }),
  }),
};
