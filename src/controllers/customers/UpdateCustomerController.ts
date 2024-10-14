import { Request, Response } from 'express';
import { Customer } from '../../models/Customers/Customer';

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, dateOfBirth, cpf, email, phone } = req.body;

  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    if (customer.deletedAt) {
      res.status(400).json({ message: 'This customer has been deleted' });
      return;
    }

    if (cpf) {
      const checkCpf = await Customer.findOne({
        where: {
          cpf,
          deletedAt: null,
        },
      });
      if (checkCpf) {
        res
          .status(400)
          .json({ message: 'A customer with this CPF already exists' });
        return;
      }
    }

    if (email) {
      const checkEmail = await Customer.findOne({
        where: {
          email,
          deletedAt: null,
        },
      });
      if (checkEmail) {
        res
          .status(400)
          .json({ message: 'A customer with this email already exists' });
        return;
      }
    }

    await customer.update({
      name: name !== undefined ? name : customer.name,
      dateOfBirth:
        dateOfBirth !== undefined ? dateOfBirth : customer.dateOfBirth,
      cpf: cpf !== undefined ? cpf : customer.cpf,
      email: email !== undefined ? email : customer.email,
      phone: phone !== undefined ? phone : customer.phone,
    });

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: 'Error updating customer', error });
  }
};
