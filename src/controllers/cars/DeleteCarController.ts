import { Request, Response } from 'express';
import { Car } from '../../models/Cars/Car';

export const deleteCarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const car = await Car.findOne({
      where: { id },
    });

    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    car.status = 'excluido';
    await car.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error at deleting car', error });
  }
};
