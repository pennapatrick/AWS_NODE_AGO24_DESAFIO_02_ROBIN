import { Router } from "express";
import { createCar } from "../../controllers/cars/CreateCarController";
import { updateCar } from "../../controllers/cars/UpdateCarController";
import { deleteCarById } from "../../controllers/cars/DeleteCarController";
import { getCars } from "../../controllers/cars/ListCarController";

const router = Router();

router.post('/', createCar);
router.put('/:id', updateCar);
router.delete('/:carId', deleteCarById);
router.get('/', getCars);

export default router;
