import express from 'express';
import { createCustomer } from '../../controllers/customers/CreateCustomerController';
import { getCustomerById } from '../../controllers/customers/ListOneCustomerController';
import { getCustomers } from '../../controllers/customers/ListCustomerController';
import { updateCustomer } from '../../controllers/customers/UpdateCustomerController';
import { deleteCustomer } from '../../controllers/customers/DeleteCustomerController';

const router = express.Router();

router.post('/', createCustomer);
router.get('/:id', getCustomerById);
router.get('/', getCustomers);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;