import { Router } from "express";
import { authorize } from '../../middleware/auth.middleware';
import { createCar } from "../../controllers/cars/CreateCarController";
import { updateCar } from "../../controllers/cars/UpdateCarController";
import { deleteCarById } from "../../controllers/cars/DeleteCarController";
import { getCars } from "../../controllers/cars/ListCarController";
import { getCarById } from "../../controllers/cars/ListOneCarController";
import { celebrate } from 'celebrate';
import { carUpdateValidationSchema, carCreateValidationSchema } from "../../validations/cars/CarValidations";

const router = Router();

router.post('/', celebrate(carCreateValidationSchema), authorize, createCar);
router.patch('/:id', celebrate(carUpdateValidationSchema), authorize, updateCar);
router.delete('/:id', authorize, deleteCarById);
router.get('/', authorize, getCars);
router.get('/:id', authorize, getCarById);

export default router;
