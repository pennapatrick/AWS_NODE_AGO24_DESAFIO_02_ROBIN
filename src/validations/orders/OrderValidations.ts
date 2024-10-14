import { Joi, Segments } from 'celebrate';

export const orderCreateValidationSchema = {
  [Segments.BODY]: Joi.object().keys({
    customerId: Joi.string().required(),
    carId: Joi.string().required(),
  }),
};

export const orderUpdateValidationSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      startDateTime: Joi.date().iso().optional().min('now').messages({
        'date.format':
          'Start date must follow the format "(YYYY-MM-DDTHH:mm:ss)"',
        'date.min': 'Start date cannot be in the past',
      }),
      endDateTime: Joi.date()
        .iso()
        .optional()
        .greater(Joi.ref('startDateTime'))
        .messages({
          'date.format':
            'End date must follow the format "(YYYY-MM-DDTHH:mm:ss)"',
          'date.greater': 'End date cannot be before the start date',
        }),
      cep: Joi.string()
        .pattern(/^\d{8}$/)
        .optional()
        .messages({
          'string.pattern.base': 'CEP must be 8 digits without formatting',
        }),
      status: Joi.string()
        .valid('Aberto', 'Aprovado', 'Cancelado', 'Fechado')
        .optional()
        .messages({
          'any.only':
            'Status must be one of "Aberto", "Aprovado", "Cancelado", or "Fechado"',
        }),
    })
    .or('startDateTime', 'endDateTime', 'cep', 'status'),
};
