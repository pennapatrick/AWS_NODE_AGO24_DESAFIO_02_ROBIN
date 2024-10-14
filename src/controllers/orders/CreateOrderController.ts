import { Request, Response } from 'express';
import { Order } from '../../models/Orders/Order';
import { Customer } from '../../models/Customers/Customer';
import { Car } from '../../models/Cars/Car';

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customerId, carId } = req.body;

  try {
    const customer = await Customer.findOne({
      where: {
        id: customerId,
        deletedAt: null,
      },
    });
    if (!customer) {
      res.status(400).json({ message: 'Customer not found' });
      return;
    }

    const car = await Car.findOne({
      where: {
        id: carId,
        status: 'ativo',
      },
    });
    if (!car) {
      res.status(400).json({ message: 'Car not found' });
      return;
    }

    const existingCarOrder = await Order.findOne({
      where: {
        carId,
        status: 'Aberto',
      },
    });
    if (existingCarOrder) {
      res.status(400).json({ message: 'This car is already on order' });
      return;
    }

    const existingCustomerOrder = await Order.findOne({
      where: {
        customerId,
        status: 'Aberto',
      },
    });
    if (existingCustomerOrder) {
      res
        .status(400)
        .json({ message: 'This customer already has an open order' });
      return;
    }

    const newOrder = await Order.create({
      customerId,
      carId,
      status: 'Aberto',
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error });
  }
};
