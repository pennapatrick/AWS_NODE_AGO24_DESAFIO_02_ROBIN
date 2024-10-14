import { Request, Response } from 'express';
import { Customer } from '../../models/Customers/Customer';

export const deleteCustomer = async (
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

    if (customer.deletedAt) {
      res
        .status(400)
        .json({ message: 'This customer has already been deleted' });
      return;
    }

    customer.deletedAt = new Date();
    await customer.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error at deleting customer', error });
  }
};
