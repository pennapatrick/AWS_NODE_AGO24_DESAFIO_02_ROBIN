import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Order } from '../../models/Orders/Order';
import { Customer } from '../../models/Customers/Customer';

interface GetOrdersQuery {
  cpf?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  size?: string;
  sort?: 'startDateTime' | 'endDateTime' | 'status';
}

export const getOrders = async (
  req: Request<unknown, unknown, unknown, GetOrdersQuery>,
  res: Response
): Promise<void> => {
  const {
    cpf,
    status,
    startDate,
    endDate,
    page = '1',
    size = '10',
    sort = 'startDateTime',
  } = req.query;

  const where: {
    status?: string;
    startDateTime?: { [Op.gte]?: Date };
    endDateTime?: { [Op.lte]?: Date };
  } = {};

  if (status) {
    where.status = status;
  }

  if (startDate || endDate) {
    if (startDate && endDate) {
      where.startDateTime = { [Op.gte]: new Date(startDate) };
      where.endDateTime = { [Op.lte]: new Date(endDate) };
    } else if (startDate) {
      where.startDateTime = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.endDateTime = { [Op.lte]: new Date(endDate) };
    }
  }

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (sort) {
    order.push([sort, 'ASC']);
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: Customer,
          as: 'customer',
          where: cpf ? { cpf } : undefined,
          attributes: ['id', 'name', 'cpf'],
        },
      ],
      order,
      limit: parseInt(size, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(size, 10),
    });

    if (rows.length === 0) {
      res.status(404).json({ message: 'No orders found' });
      return;
    }

    const formattedOrders = rows.map((order) => {
      const orderData = order.get({ plain: true });
      return {
        ...orderData,
        customer: orderData.customer || null,
      };
    });

    res.status(200).json({
      totalOrders: count,
      totalPages: Math.ceil(count / parseInt(size, 10)),
      currentPage: parseInt(page, 10),
      orders: formattedOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
