import { Request, Response } from 'express';
import { Customer } from '../models/Customer';

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const { name, dateOfBirth, cpf, email, phone } = req.body;
  try {
    const newCustomer = await Customer.create({ name, dateOfBirth, cpf, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating customer', error });
  }
};

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};