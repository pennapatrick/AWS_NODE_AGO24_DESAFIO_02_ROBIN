import { Request, Response } from 'express';
import { Car } from '../../models/Cars/Car';
import { Item } from '../../models/Cars/Item';

export const getCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const car = await Car.findOne({
      where: { id },
      include: [{ model: Item, as: 'items', attributes: ['name'] }],
    });

    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    const carWithItemNames = {
      ...car.get(),
      items: car.items ? car.items.map((item) => item.name) : [],
    };

    res.status(200).json(carWithItemNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error });
  }
};
