import { Joi, Segments } from 'celebrate';

export const carCreateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    plate: Joi.string()
      .pattern(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/)
      .required()
      .messages({
        'string.pattern.base': 'plate must follow mercosul pattern',
      }),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    km: Joi.number().min(0).optional(),
    year: Joi.number()
      .required()
      .max(new Date().getFullYear())
      .min(new Date().getFullYear() - 11),
    dailyPrice: Joi.number().positive().required(),
    status: Joi.string().valid('ativo', 'inativo', 'excluido').required(),
    items: Joi.array().items(Joi.string()).min(0).max(5).unique().required(),
  }),
};

export const carUpdateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    plate: Joi.string()
      .pattern(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/)
      .optional()
      .messages({
        'string.pattern.base': 'plate must follow mercosul pattern',
      }),
    brand: Joi.string().optional(),
    model: Joi.string().optional(),
    km: Joi.number().min(0).optional(),
    year: Joi.number()
      .optional()
      .max(new Date().getFullYear())
      .min(new Date().getFullYear() - 11),
    dailyPrice: Joi.number().positive().optional(),
    status: Joi.string().valid('ativo', 'inativo').optional(),
    items: Joi.array().items(Joi.string()).min(0).max(5).unique().optional(),
  }),
};
