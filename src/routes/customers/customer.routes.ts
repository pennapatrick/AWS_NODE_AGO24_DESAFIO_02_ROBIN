import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createCustomer } from '../../controllers/customers/CreateCustomerController';
import { getCustomerById } from '../../controllers/customers/ListOneCustomerController';
import { getCustomers } from '../../controllers/customers/ListCustomerController';
import { updateCustomer } from '../../controllers/customers/UpdateCustomerController';
import { deleteCustomer } from '../../controllers/customers/DeleteCustomerController';
import { celebrate } from 'celebrate';
import {
  customerCreateValidationSchema,
  customerUpdateValidationSchema,
} from '../../validations/customers/CustomerValidations';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         cpf:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *   responses:
 *     customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         dateOfBirth:
 *           type: string
 *           format: date
 *         cpf:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *       example:
 *         id: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
 *         name: John Doe
 *         dateOfBirth: 2020-01-01
 *         cpf: 00000000000
 *         email: john.doe@email.com
 *         createdAt: 2020-01-01T00:00:00.000Z
 *         updatedAt: 2020-01-01T00:00:00.000Z
 *         deletedAt: null
 */

/**
 * @swagger
 * api/v1/customers/
 *   post:
 *     summary: new client
 *     description: create a new client
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 cpf:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       400:
 *         description: Error creating customer
 *       500:
 *         description: Internal Server Error
 */
router.post(
  '/',
  celebrate(customerCreateValidationSchema),
  authorize,
  createCustomer
);

/**
 * @swagger
 * api/v1/customers/{id}:
 *   get:
 *     summary: Return a customer by ID
 *     description: Return a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: customer ID
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: customer found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 cpf:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       404:
 *         description: customer not found
 */
router.get('/:id', authorize, getCustomerById);

/**
 * @swagger
 * api/v1/customers/:
 *   get:
 *     summary: return all customers
 *     description: return all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: customers found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                   cpf:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authorize, getCustomers);

/**
 * @swagger
 *  api/v1/customers/{id}:
 *   patch:
 *     summary: Update a customer by ID
 *     description: Update a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: customer ID
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 cpf:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       404:
 *         description: customer not found
 *       500:
 *          description: Error fetching customer
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  '/:id',
  celebrate(customerUpdateValidationSchema),
  authorize,
  updateCustomer
);

/**
 * @swagger
 *  api/v1/customers/{id}:
 *   delete:
 *     summary: softe delete of a customer
 *     description: Delete a customer by id (soft delete)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: customer ID
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 9f7d5b9c-9b9f-4b7d-9b9f-4b7d9b9f4b7d
 *       404:
 *         description: Customer not found
 *       500:
 *          description: Error fetching customer
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authorize, deleteCustomer);

export default router;
