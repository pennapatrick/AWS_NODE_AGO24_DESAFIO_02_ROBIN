import express from "express";
import { authorize } from "../../middleware/auth.middleware";
import { createCustomer } from "../../controllers/customers/CreateCustomerController";
import { getCustomerById } from "../../controllers/customers/ListOneCustomerController";
import { getCustomers } from "../../controllers/customers/ListCustomerController";
import { updateCustomer } from "../../controllers/customers/UpdateCustomerController";
import { deleteCustomer } from "../../controllers/customers/DeleteCustomerController";
import { celebrate } from "celebrate";
import {
  customerCreateValidationSchema,
  customerUpdateValidationSchema,
} from "../../validations/customers/CustomerValidations";

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
 * /customers/
 *   post:
 *     summary: Cria um novo cliente
 *     description: Cria um novo cliente
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
 *         description: Cliente criado com sucesso
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
 *         description: Erro ao criar o cliente
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/",
  celebrate(customerCreateValidationSchema),
  authorize,
  createCustomer
);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     description: Retorna um cliente pelo ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
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
 *         description: Cliente não encontrado
 */
router.get("/:id", authorize, getCustomerById);

/**
 * @swagger
 * /customers/:
 *   get:
 *     summary: Retorna todos os clientes
 *     description: Retorna todos os clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Clientes encontrados
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
 *         description: Erro interno do servidor
 */
router.get("/", authorize, getCustomers);

/**
 * @swagger
 *  /customers/{id}:
 *   patch:
 *     summary: Atualiza um cliente pelo ID
 *     description: Atualiza um cliente pelo ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente
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
 *         description: Usuário atualizado com sucesso
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
 *         description: Cliente não encontrado
 *       500:
 *          description: Error fetching customer
 *     security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  celebrate(customerUpdateValidationSchema),
  authorize,
  updateCustomer
);

/**
 * @swagger
 *  /customers/{id}:
 *   delete:
 *     summary: softe delete of a customer
 *     description: Deleta um cliente pelo ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do cliente
 *         schema:
 *           type: string
 *         required: true
 *         example: 1
 *     responses:
 *       204:
 *         description: Usuário exclu do com sucesso
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
router.delete("/:id", authorize, deleteCustomer);

export default router;
