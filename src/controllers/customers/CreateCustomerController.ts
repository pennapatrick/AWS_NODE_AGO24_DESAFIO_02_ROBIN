import { Request, Response } from 'express';
import { Customer } from '../../models/Customers/Customer';

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const { name, dateOfBirth, cpf, email, phone } = req.body;

  try {
    if (!name) {
      res.status(400).json({ message: 'name is required' });
      return
    };
    if (!dateOfBirth) {
      res.status(400).json({ message: 'date of birth is required' });
      return
    };
    if (!cpf) {
      res.status(400).json({ message: 'cpf is required' });
      return
    };
    if (!email) {
      res.status(400).json({ message: 'email is required' });
      return
    };
    if (!phone) {
      res.status(400).json({ message: 'phone is required' });
      return
    };

    const checkCpf = await Customer.findOne({
      where: {
        cpf,
        deletedAt: null
      }
    });
    if (checkCpf) {
      res.status(400).json({ message: 'A customer with this CPF already exists' });
      return
    };

    const checkEmail = await Customer.findOne({
      where: {
        email,
        deletedAt: null
      }
    });
    if (checkEmail) {
      res.status(400).json({ message: 'A customer with this email already exists' });
      return
    };

    const newCustomer = await Customer.create({ name, dateOfBirth, cpf, email, phone });
    res.status(201).json(newCustomer);

  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error });
  }
};