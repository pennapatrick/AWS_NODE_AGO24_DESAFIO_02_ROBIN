import { Router } from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createCar } from '../../controllers/cars/CreateCarController';
import { updateCar } from '../../controllers/cars/UpdateCarController';
import { deleteCarById } from '../../controllers/cars/DeleteCarController';
import { getCars } from '../../controllers/cars/ListCarController';
import { getCarById } from '../../controllers/cars/ListOneCarController';
import { celebrate } from 'celebrate';
import {
  carUpdateValidationSchema,
  carCreateValidationSchema,
} from '../../validations/cars/CarValidations';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         plate:
 *           type: string
 *           pattern: ^[A-Z]{3}[0-9][A-Z][0-9]{2}$
 *         brand:
 *           type: string
 *         model:
 *           type: string
 *         km:
 *           type: number
 *           minimum: 0
 *         year:
 *           type: number
 *           minimum: 2013
 *           maximum: 2024
 *         dailyPrice:
 *           type: number
 *           minimum: 0
 *         status:
 *           type: string
 *           enum: [ativo, inativo, excluido]
 *         items:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 *  api/v1/cars:
 *    post:
 *      summary: Create a new car
 *      tags: [cars]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                plate:
 *                  type: string
 *                  pattern: ^[A-Z]{3}[0-9][A-Z][0-9]{2}$
 *                brand:
 *                  type: string
 *                model:
 *                  type: string
 *                km:
 *                  type: number
 *                  minimum: 0
 *                year:
 *                  type: number
 *                  minimum: 1900
 *                  maximum: 2050
 *                dailyPrice:
 *                  type: number
 *                  minimum: 0
 *                status:
 *                  type: string
 *                  enum: [ativo, inativo, excluido]
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                  minItems: 0
 *                  maxItems: 5
 *                  uniqueItems: true
 *      responses:
 *        201:
 *          description: The car was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                  plate:
 *                    type: string
 *                  brand:
 *                    type: string
 *                  model:
 *                    type: string
 *                  km:
 *                    type: number
 *                  year:
 *                    type: number
 *                  dailyPrice:
 *                    type: number
 *                  status:
 *                    type: string
 *                  items:
 *                    type: array
 *                    items:
 *                      type: string
 *        400:
 *          description: error due to invalid car data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          description: error creating the car
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - bearerAuth: []
 *        - apiKeyAuth: []
 *        - basicAuth: []
 */
router.post('/', celebrate(carCreateValidationSchema), authorize, createCar);

/**
 * @swagger
 *  api/v1/cars/{id}:
 *    patch:
 *      summary: Update a car
 *      tags: [cars]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The car id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                plate:
 *                  type: string
 *                  pattern: ^[A-Z]{3}[0-9][A-Z][0-9]{2}$
 *                brand:
 *                  type: string
 *                model:
 *                  type: string
 *                km:
 *                  type: number
 *                  minimum: 0
 *                year:
 *                  type: number
 *                  minimum: 1900
 *                  maximum: 2050
 *                dailyPrice:
 *                  type: number
 *                  minimum: 0
 *                status:
 *                  type: string
 *                  enum: [ativo, inativo, excluido]
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                  minItems: 0
 *                  maxItems: 5
 *                  uniqueItems: true
 *      responses:
 *        200:
 *          description: The car was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                  plate:
 *                    type: string
 *                  brand:
 *                    type: string
 *                  model:
 *                    type: string
 *                  km:
 *                    type: number
 *                  year:
 *                    type: number
 *                  dailyPrice:
 *                    type: number
 *                  status:
 *                    type: string
 *                  items:
 *                    type: array
 *                    items:
 *                      type: string
 *        400:
 *          description: error due to invalid car data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          description: error updating the car
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - bearerAuth: []
 *        - apiKeyAuth: []
 *        - basicAuth: []
 */
router.patch(
  '/:id',
  celebrate(carUpdateValidationSchema),
  authorize,
  updateCar
);

/**
 * @swagger
 *  api/v1/cars/{id}:
 *    delete:
 *      summary: Delete a car
 *      tags: [cars]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The car id
 *      responses:
 *        204:
 *          description: The car was successfully deleted
 *        500:
 *          description: error deleting the car
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - bearerAuth: []
 *        - apiKeyAuth: []
 *        - basicAuth: []
 */
router.delete('/:id', authorize, deleteCarById);

/**
 * @swagger
 *  api/v1/cars:
 *    get:
 *      summary: Lists all cars
 *      tags: [cars]
 *      responses:
 *        200:
 *          description: List of cars returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                      format: uuid
 *                    plate:
 *                      type: string
 *                    brand:
 *                      type: string
 *                    model:
 *                      type: string
 *                    km:
 *                      type: number
 *                    year:
 *                      type: number
 *                    dailyPrice:
 *                      type: number
 *                    status:
 *                      type: string
 *                    items:
 *                      type: array
 *                      items:
 *                        type: string
 *        500:
 *          description: error getting the cars
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - bearerAuth: []
 *        - apiKeyAuth: []
 *        - basicAuth: []
 */
router.get('/', authorize, getCars);

/**
 * @swagger
 *  api/v1/cars/{id}:
 *    get:
 *      summary: Get a car
 *      tags: [cars]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The car id
 *      responses:
 *        200:
 *          description: The car was successfully returned
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                    format: uuid
 *                  plate:
 *                    type: string
 *                  brand:
 *                    type: string
 *                  model:
 *                    type: string
 *                  km:
 *                    type: number
 *                  year:
 *                    type: number
 *                  dailyPrice:
 *                    type: number
 *                  status:
 *                    type: string
 *                  items:
 *                    type: array
 *                    items:
 *                      type: string
 *        500:
 *          description: error getting the car
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *      security:
 *        - bearerAuth: []
 *        - apiKeyAuth: []
 *        - basicAuth: []
 */
router.get('/:id', authorize, getCarById);

export default router;
