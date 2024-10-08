import express from 'express';
import { getCars, createCar, getCarById } from '../controllers/carController';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);

export default router;
