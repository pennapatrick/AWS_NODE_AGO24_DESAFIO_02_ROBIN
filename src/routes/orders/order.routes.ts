import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createOrder } from '../../controllers/orders/CreateOrderController';
import { celebrate } from 'celebrate';
import { orderCreateValidationSchema } from '../../validations/orders/OrderValidations';

const router = express.Router();

router.post('/', celebrate(orderCreateValidationSchema), authorize, createOrder);

export default router;