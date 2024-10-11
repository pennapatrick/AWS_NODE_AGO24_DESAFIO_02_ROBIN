import express from 'express';
import { createCustomer } from '../../controllers/customers/CreateCustomerController';
import { getCustomerById } from '../../controllers/customers/ListOneCustomerController';
import { getCustomers } from '../../controllers/customers/ListCustomerController';
import { updateCustomer } from '../../controllers/customers/UpdateCustomerController';
import { deleteCustomer } from '../../controllers/customers/DeleteCustomerController';
import { celebrate } from 'celebrate';
import { customerCreateValidationSchema, customerUpdateValidationSchema } from '../../validations/customers/CustomerValidations';

const router = express.Router();

router.post('/', celebrate(customerCreateValidationSchema), createCustomer);
router.get('/:id', getCustomerById);
router.get('/', getCustomers);
router.patch('/:id', celebrate(customerUpdateValidationSchema), updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;