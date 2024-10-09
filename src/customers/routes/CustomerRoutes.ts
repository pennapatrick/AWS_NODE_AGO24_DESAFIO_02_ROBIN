import express from 'express';
import { createCustomer } from '../controllers/CreateCustomerController';
import { getCustomerById } from '../controllers/GetCustomerController';
import { getCustomers } from '../controllers/GetCustomersController';

const router = express.Router();

router.post('/', createCustomer);
router.get('/:id', getCustomerById);
router.get('/', getCustomers);

export default router;