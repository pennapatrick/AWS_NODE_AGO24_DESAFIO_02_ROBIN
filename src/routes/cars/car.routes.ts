import { Router } from "express";
import { createCar } from "../../controllers/cars/CreateCarController";
import { updateCar } from "../../controllers/cars/UpdateCarController";
import { deleteCarById } from "../../controllers/cars/DeleteCarController";
import { getCars } from "../../controllers/cars/ListCarController";
import { getCarById } from "../../controllers/cars/ListOneCarController";
import { celebrate } from 'celebrate';
import { carUpdateValidationSchema, carCreateValidationSchema } from "../../validations/cars/CarValidations";

const router = Router();

router.post('/', celebrate(carCreateValidationSchema), createCar);
router.patch('/:id', celebrate(carUpdateValidationSchema), updateCar);
router.delete('/:id', deleteCarById);
router.get('/', getCars);
router.get('/:id', getCarById);

export default router;
