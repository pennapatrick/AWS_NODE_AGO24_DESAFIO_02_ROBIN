import express from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;