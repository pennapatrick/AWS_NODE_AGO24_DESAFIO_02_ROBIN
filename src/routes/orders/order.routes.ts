import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createOrder } from '../../controllers/orders/CreateOrderController';
import { getOrderById } from '../../controllers/orders/ListOneOrderController'
import { deleteOrder } from '../../controllers/orders/DeleteOrderController';
import { updateOrder } from '../../controllers/orders/UpdateOrderController';
import { celebrate } from 'celebrate';
import { orderCreateValidationSchema } from '../../validations/orders/OrderValidations';

const router = express.Router();

router.post('/', celebrate(orderCreateValidationSchema), authorize, createOrder);
router.get('/:id', authorize, getOrderById)
router.delete('/:id', authorize, deleteOrder);
router.patch('/:id', authorize, updateOrder);

export default router;