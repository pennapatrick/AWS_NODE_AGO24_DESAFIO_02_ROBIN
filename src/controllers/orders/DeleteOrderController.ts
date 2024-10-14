import { Request, Response } from 'express';
import { Order } from '../../models/Orders/Order';

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;

  try {
    const order = await Order.findOne({
      where: {
        id,
        status: 'Aberto',
      },
    });

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.status = 'Cancelado';
    order.cancellationDate = new Date();

    await order.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error at deleting order', error });
  }
};
