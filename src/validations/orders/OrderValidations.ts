import { Joi, Segments } from 'celebrate';

export const orderCreateValidationSchema = {
    [Segments.BODY]: Joi.object().keys({
        customerId: Joi.string().required(),
        carId: Joi.string().required(),
    }),
};