import { Router } from "express";
import { createCar } from "../../controllers/cars/CreateCarController";
import { updateCar } from "../../controllers/cars/UpdateCarController";
import { deleteCarById } from "../../controllers/cars/DeleteCarController";
import { getCars } from "../../controllers/cars/ListCarController";
import { getCarById } from "../../controllers/cars/ListOneCarController";
import { celebrate, Joi, Segments } from 'celebrate';

const router = Router();

const carValidationSchema = {
    [Segments.BODY]: Joi.object().keys({
      plate: Joi.string()
        .pattern(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/)
        .required()
        .messages({
          'string.pattern.base': 'plate must follow mercosul pattern',
        }),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      km: Joi.number().min(0).optional(),
      year: Joi.number().required().max(new Date().getFullYear()).min(new Date().getFullYear() - 11),
      dailyPrice: Joi.number().positive().required(),
      status: Joi.string().valid('ativo', 'inativo', 'excluido').required(),
      items: Joi.array().items(Joi.string()).min(0).max(5).unique().required(),
    }),
  };
  
  

router.post('/', celebrate(carValidationSchema), createCar);
router.patch('/:id', updateCar);
router.delete('/:id', deleteCarById);
router.get('/', getCars);
router.get('/:id', getCarById);

export default router;
