import express from 'express';
import { authorize } from '../../middleware/auth.middleware';
import { createCustomer } from '../../controllers/customers/CreateCustomerController';
import { getCustomerById } from '../../controllers/customers/ListOneCustomerController';
import { getCustomers } from '../../controllers/customers/ListCustomerController';
import { updateCustomer } from '../../controllers/customers/UpdateCustomerController';
import { deleteCustomer } from '../../controllers/customers/DeleteCustomerController';
import { celebrate } from 'celebrate';
import { customerCreateValidationSchema, customerUpdateValidationSchema } from '../../validations/customers/CustomerValidations';

const router = express.Router();

router.post('/', celebrate(customerCreateValidationSchema), authorize, createCustomer);
router.get('/:id', authorize, getCustomerById);
router.get('/', authorize, getCustomers);
router.patch('/:id', celebrate(customerUpdateValidationSchema), authorize, updateCustomer);
router.delete('/:id', authorize, deleteCustomer);

export default router;