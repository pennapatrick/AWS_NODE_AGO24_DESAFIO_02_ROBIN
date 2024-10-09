import express from 'express';
import { getCars, createCar, getCarById, updateCar } from '../controllers/carController';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', createCar);
router.patch('/:id', updateCar);

export default router;
