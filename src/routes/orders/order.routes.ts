import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createOrder } from '../../controllers/orders/CreateOrderController';
import { getOrderById } from '../../controllers/orders/ListOneOrderController';
import { deleteOrder } from '../../controllers/orders/DeleteOrderController';
import { updateOrder } from '../../controllers/orders/UpdateOrderController';
import { celebrate } from 'celebrate';
import { orderCreateValidationSchema, orderUpdateValidationSchema } from '../../validations/orders/OrderValidations';
import { getOrders } from '../../controllers/orders/ListOrderController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - id
 *         - customerId
 *         - carId
 *         - startDateTime
 *         - endDateTime
 *         - cep
 *       properties:
 *         id:
 *           type: string
 *         customerId:
 *           type: string
 *         carId:
 *           type: string
 *         startDateTime:
 *           type: string
 *           format: date-time
 *         endDateTime:
 *           type: string
 *           format: date-time
 *         cep:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - Aberto
 *             - Aprovado
 *             - Cancelado
 *             - Fechado
 *       example:
 *         id: 00000000-0000-0000-0000-000000000000
 *         customerId: 00000000-0000-0000-0000-000000000000
 *         carId: 00000000-0000-0000-0000-000000000000
 *         startDateTime: 2022-01-01T00:00:00.000Z
 *         endDateTime: 2022-01-01T00:00:00.000Z
 *         cep: 00000000
 *         status: Aberto
 */

/**
 * @swagger
 * api/v1/orders:
 *   post:
 *     summary: Create an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The order ID
 *                 example: 00000000-0000-0000-0000-000000000000
 *               customerId:
 *                 type: string
 *                 description: The customer ID
 *                 example: 00000000-0000-0000-0000-000000000000
 *               carId:
 *                 type: string
 *                 description: The car ID
 *                 example: 00000000-0000-0000-0000-000000000000
 *               status:
 *                 type: string
 *                 description: The order status
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: The order was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 */
router.post(
  '/',
  celebrate(orderCreateValidationSchema),
  authorize,
  createOrder
);

/**
 * @swagger
 * api/v1/orders/{id}:
 *   get:
 *     summary: Retrieve an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */

router.get('/:id', authorize, getOrderById);

/**
 * @swagger
 * api/v1/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       204:
 *         description: The order was deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     deprecated: true

 */
router.delete('/:id', authorize, deleteOrder);

/**
 * @swagger
 * api/v1/orders/{id}:
 *   patch:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 *     deprecated: true
 *
 */
router.patch('/:id', celebrate(orderUpdateValidationSchema), authorize, updateOrder);

/**
 * @swagger
 * api/v1/orders:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The orders were retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authorize, getOrders);

export default router;
