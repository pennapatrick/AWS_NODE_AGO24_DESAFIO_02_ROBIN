import { Request, Response } from 'express';
import { Customer } from '../../models/Customers/Customer';

export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const customer = await Customer.findOne({
      where: { id },
    });

    if (!customer) {
      res.status(404).json({ message: 'Customer not found' });
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error });
  }
};
