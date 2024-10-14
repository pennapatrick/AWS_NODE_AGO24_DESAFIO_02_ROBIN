import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Customer } from '../../models/Customers/Customer';

interface GetCustomersQuery {
  name?: string;
  email?: string;
  cpf?: string;
  excluded?: string;
  page?: string;
  size?: string;
  sort?: string;
}

export const getCustomers = async (
  req: Request<unknown, unknown, unknown, GetCustomersQuery>,
  res: Response
): Promise<void> => {
  const {
    name,
    email,
    cpf,
    excluded,
    page = '1',
    size = '10',
    sort = 'name',
  } = req.query;

  const where: {
    name?: { [Op.like]: string };
    email?: { [Op.like]: string };
    cpf?: string;
    deletedAt?: { [Op.not]: null } | { [Op.is]: null };
  } = {};

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }

  if (email) {
    where.email = { [Op.like]: `%${email}%` };
  }

  if (cpf) {
    where.cpf = cpf;
  }

  if (excluded) {
    where.deletedAt =
      excluded === 'yes' ? { [Op.not]: null } : { [Op.is]: null };
  }

  if (sort) {
    order.push([sort, 'ASC']);
  }

  try {
    const { count, rows } = await Customer.findAndCountAll({
      where,
      order,
      limit: parseInt(size, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(size, 10),
    });

    if (rows.length === 0) {
      res.status(404).json({ message: 'No customers found' });
      return;
    }

    res.status(200).json({
      totalCustomers: count,
      totalPages: Math.ceil(count / parseInt(size, 10)),
      currentPage: parseInt(page, 10),
      customers: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};
