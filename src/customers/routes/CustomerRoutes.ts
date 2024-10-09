import express from 'express';
import { createCustomer } from '../controllers/CreateCustomerController';
import { getCustomerById } from '../controllers/GetCustomerController';
import { getCustomers } from '../controllers/GetCustomersController';
import { updateCustomer } from '../controllers/UpdateCustomerController';
import { deleteCustomer } from '../controllers/DeleteCustomerController';

const router = express.Router();

router.post('/', createCustomer);
router.get('/:id', getCustomerById);
router.get('/', getCustomers);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;