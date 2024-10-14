import { Request, Response } from 'express';
import { Car } from '../../models/Cars/Car';
import { Item } from '../../models/Cars/Item';

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
      return;
    }

    const newCar = await Car.create({
      plate,
      brand,
      model,
      km,
      year,
      dailyPrice,
      status,
    });

    if (items && items.length > 0) {
      const itemList = items.slice(0, 5).map((item: string) => ({
        name: item,
        carId: newCar.id,
      }));
      await Item.bulkCreate(itemList);
    }

    const associatedItems = await Item.findAll({
      where: { carId: newCar.id },
      attributes: ['name'],
    });

    const itemNames = associatedItems.map((item) => item.name);

    const carWithItemNames = {
      ...newCar.get(),
      items: itemNames,
    };

    res.status(201).json(carWithItemNames);
  } catch (error) {
    res.status(500).json({ message: 'Error creating car', error });
  }
};
