import { Joi, Segments } from 'celebrate';

export const customerCreateValidationSchema = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        dateOfBirth: Joi.date()
            .iso()
            .required()
            .messages({
                'date.format': 'date of birth must follow the format "(YYYY-MM-DD)"'
            }),
        cpf: Joi.string()
            .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
            .required()
            .messages({
                'string.pattern.base': 'CPF must follow the format "000.000.000-00"',
            }),
        email: Joi.string().email().required(),
        phone: Joi.string()
            .pattern(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/)
            .required()
            .messages({
                'string.pattern.base': 'phone must follow the format "(XX)XXXXX-XXXX"'
            }),
    }),
};

export const customerUpdateValidationSchema = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().optional(),
        dateOfBirth: Joi.date()
            .iso()
            .optional()
            .messages({
                'date.format': 'date of birth must follow the format "(YYYY-MM-DD)"'
            }),
        cpf: Joi.string()
            .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
            .optional()
            .messages({
                'string.pattern.base': 'CPF must follow the format "000.000.000-00"',
            }),
        email: Joi.string().email().optional(),
        phone: Joi.string()
            .pattern(/^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/)
            .optional()
            .messages({
                'string.pattern.base': 'phone must follow the format "(XX)XXXXX-XXXX"'
            }),
    }),
};