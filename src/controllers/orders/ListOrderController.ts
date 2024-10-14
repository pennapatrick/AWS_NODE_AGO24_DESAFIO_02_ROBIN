import { Request, Response } from "express";
import { Order } from "../../models/Orders/Order";
import { Op } from "sequelize";

interface GetOrderQuery {
  id?: string;
  status?: string;
  createdAt?: Date;
  startDateTime?: Date;
  endDateTime?: Date;
  rentalFee?: number;
  totalValue?: number;
  cep?: string;
  city?: string;
  uf?: string;
  customerId?: string;
  carId?: string;
  page?: string;
  size?: string;
  sort?: string;
}

export const getOrder = async (
  req: Request<unknown, unknown, unknown, GetOrderQuery>,
  res: Response
): Promise<void> => {
  const {
    id,
    status,
    createdAt,
    startDateTime,
    endDateTime,
    rentalFee,
    totalValue,
    cep,
    city,
    uf,
    customerId,
    page = "1",
    size = "10",
    sort = "quantityOrders",
  } = req.query;

  const where: {
    id?: string;
    status?: string;
    createdAt?: Date;
    startDateTime?: Date;
    endDateTime?: Date;
    rentalFee?: number;
    totalValue?: number;
    cep?: string;
    city?: string;
    uf?: string;
    customerId?: string;
  } = {};

  const order: Array<[string, "ASC" | "DESC"]> = [];

  if (id) {
    where.id = id;
  }

  if (status) {
    where.status = status;
  }

  if (createdAt) {
    where.createdAt = createdAt;
  }

  if (startDateTime) {
    where.startDateTime = startDateTime;
  }

  if (endDateTime) {
    where.endDateTime = endDateTime;
  }

  if (rentalFee) {
    where.rentalFee = rentalFee;
  }

  if (totalValue) {
    where.totalValue = totalValue;
  }

  if (cep) {
    where.cep = cep;
  }

  if (city) {
    where.city = city;
  }

  if (uf) {
    where.uf = uf;
  }

  if (customerId) {
    where.customerId = customerId;
  }

  if (sort) {
    order.push([sort, "ASC"]);
  }

  try {
    const { count, rows } = await Order.findAndCountAll({
      where,
      order,
      limit: parseInt(size, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(size, 10),
    });

    if (rows.length === 0) {
      res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      totalOrders: count,
      totalPages: Math.ceil(count / parseInt(size, 10)),
      currentPage: parseInt(page, 10),
      orders: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
