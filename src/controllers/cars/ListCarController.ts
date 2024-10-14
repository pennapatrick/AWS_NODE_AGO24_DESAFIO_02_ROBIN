import { Request, Response } from 'express';
import { Car } from '../../models/Cars/Car';
import { Item } from '../../models/Cars/Item';
import { Op } from 'sequelize';

interface GetCarsQuery {
  status?: string;
  plateEnd?: string;
  brand?: string;
  model?: string;
  km?: number;
  yearFrom?: number;
  yearTo?: number;
  priceMin?: number;
  priceMax?: number;
  page?: string;
  size?: string;
  sort?: string;
}

export const getCars = async (
  req: Request<unknown, unknown, unknown, GetCarsQuery>,
  res: Response
): Promise<void> => {
  const {
    status,
    plateEnd,
    brand,
    model,
    km,
    yearFrom,
    yearTo,
    priceMin,
    priceMax,
    page = '1',
    size = '10',
    sort = 'dailyPrice',
  } = req.query;

  const where: {
    status?: string;
    plate?: { [Op.like]: string };
    brand?: string;
    model?: string;
    km?: { [Op.lte]: number };
    year?: {
      [Op.gte]?: number;
      [Op.lte]?: number;
    };
    dailyPrice?: {
      [Op.gte]?: number;
      [Op.lte]?: number;
    };
    id?: { [Op.in]: string[] };
  } = {};

  const order: Array<[string, 'ASC' | 'DESC']> = [];

  if (status) {
    where.status = status;
  }

  if (plateEnd) {
    where.plate = { [Op.like]: `%${plateEnd}` };
  }

  if (brand) {
    where.brand = brand;
  }

  if (model) {
    where.model = model;
  }

  if (km) {
    where.km = { [Op.lte]: km };
  }

  if (yearFrom || yearTo) {
    where.year = {};
    if (yearFrom) {
      where.year[Op.gte] = yearFrom;
    }
    if (yearTo) {
      where.year[Op.lte] = yearTo;
    }
  }

  if (priceMin || priceMax) {
    where.dailyPrice = {};
    if (priceMin) {
      where.dailyPrice[Op.gte] = priceMin;
    }
    if (priceMax) {
      where.dailyPrice[Op.lte] = priceMax;
    }
  }

  if (sort) {
    order.push([sort, 'ASC']);
  }

  try {
    const { count, rows } = await Car.findAndCountAll({
      where,
      include: [
        {
          model: Item,
          as: 'items',
          attributes: ['name'],
        },
      ],
      distinct: true,
      order,
      limit: parseInt(size, 10),
      offset: (parseInt(page, 10) - 1) * parseInt(size, 10),
    });

    const carsWithItemNames = rows.map((car) => {
      const carData = car.get({ plain: true });
      return {
        ...carData,
        items: carData.items ? carData.items.map((item) => item.name) : [],
      };
    });

    if (carsWithItemNames.length === 0) {
      res.status(404).json({ message: 'No cars found' });
      return;
    }

    res.status(200).json({
      totalCars: count,
      totalPages: Math.ceil(count / parseInt(size, 10)),
      currentPage: parseInt(page, 10),
      cars: carsWithItemNames,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error });
  }
};
