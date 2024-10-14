import { Request, Response } from 'express';
import { Order } from '../../models/Orders/Order';
import { Customer } from '../../models/Customers/Customer';
import { Car } from '../../models/Cars/Car';
import { Item } from '../../models/Cars/Item';

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'name', 'email', 'cpf'],
        },
        {
          model: Car,
          as: 'car',
          attributes: [
            'id',
            'brand',
            'model',
            'year',
            'km',
            'plate',
            'dailyPrice',
          ],
          include: [
            {
              model: Item,
              as: 'items',
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};
