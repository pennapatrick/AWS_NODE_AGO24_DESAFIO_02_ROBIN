import { Router } from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createUser } from '../../controllers/users/CreateUserController';
import { updateUser } from '../../controllers/users/UpdateUserController';
import { deleteUser } from '../../controllers/users/DeleteUserController';
import { listUsers } from '../../controllers/users/ListUserController';
import { listOneUser } from '../../controllers/users/ListOneUserController';
import { celebrate } from 'celebrate';
import {
  userCreateValidationSchema,
  userUpdateValidationSchema,
} from '../../validations/users/UserValidations';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the user
 *           example: 9f7d5b9c-9b9f-4b7d-9b9f-4b7d9b9f4b7d
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: someome@email.com
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: 12345678
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date when the user was created
 *           example: 2020-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date when the user was updated
 *           example: 2020-01-01T00:00:00.000Z
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: The date when the user was deleted
 *           example: 2020-01-01T00:00:00.000Z
 *           nullable: true
 *       required:
 *         - id
 *         - name
 *         - email
 *         - password
 *         - createdAt
 *         - updatedAt
 *         - deletedAt
 */

/**
 * @swagger
 * /users/{id}:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: error due to invalid user data
 *       401:
 *         description: unauthorized
 *       500:
 *         description: error creating the user
 */
router.post('/', celebrate(userCreateValidationSchema), createUser);

/**
 * @swagger
 * /users/updateuser/{id}:
 *   put:
 *     summary: Update a user's information
 *     description: Allows updating a user's information, except for the "id", "createdAt" and "deletedAt" fields. Only active users (with "deletedAt" null) can be updated.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the user to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password (will be hashed)
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid request
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating the user
 *     security:
 *       - bearerAuth: []
 */
router.put(
  '/:id',
  celebrate(userUpdateValidationSchema),
  authorize,
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (soft delete)
 *     description: Performs a soft delete on a user, setting the "deletedAt" field to the current time.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the user to be deleted
 *     responses:
 *       204:
 *         description: User deleted successfully (soft delete)
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting the user
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authorize, deleteUser);

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Lists all active users
 *     description: Returns a list of all users whose "deletedAt" field is null (not deleted users).
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users returned successfully
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
 *         description: Error retrieving users
 *     security:
 *       - bearerAuth: []
 */
router.get('/', authorize, listUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user's information
 *     description: Search for a user by ID, as long as the "deletedAt" field is null (active user).
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The ID of the user to be searched
 *     responses:
 *       200:
 *         description: User found
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
 *         description: User not found
 *       500:
 *         description: Error searching for the user
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', authorize, listOneUser);

export default router;
