import { Request, Response } from 'express';
import { Customer } from '../models/Customer';

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};