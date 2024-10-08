import { Request, Response } from 'express';
import { Car } from '../models/Car';
import { Item } from '../models/Item'

export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  const { plate, brand, model, km, year, dailyPrice, status, items } = req.body;

  try {
    const existingCar = await Car.findOne({
      where: {
        plate,
        status: ['ativo', 'inativo'],
      },
    });

    if (existingCar) {
      res.status(400).json({ message: 'Car with this plate already exists' });
      return
    }

    const newCar = await Car.create({ plate, brand, model, km, year, dailyPrice, status });

    if (items && items.length > 0) {
      const itemList = items.slice(0, 5).map((item: string) => ({
        name: item,
        carId: newCar.id,
      }));
      await Item.bulkCreate(itemList);
    }

    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: 'Error creating car', error });
  }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const car = await Car.findOne({
        where: { id },
        include: [{ model: Item, as: 'items' }],
      });
  
      if (!car) {
        res.status(404).json({ message: 'Car not found' });
        return 
      }
  
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching car', error });
    }
  };

  
  
