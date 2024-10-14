import { Router } from 'express';
import { login } from '../../controllers/users/LoginUserController';

const router = Router();

/**
 * @swagger
 * api/v1/auth/:
 *   post:
 *     summary: Login a user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

router.post('/', login);

export default router;
