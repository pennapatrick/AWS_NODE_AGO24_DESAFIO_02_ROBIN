import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createOrder } from '../../controllers/orders/CreateOrderController';

const router = express.Router();

router.post('/', authorize, createOrder);

export default router;