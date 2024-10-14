import { Request, Response } from 'express';
import { Car } from '../../models/Cars/Car';

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { plate, brand, model, km, year, dailyPrice, status } = req.body;

  try {
    const car = await Car.findOne({ where: { id } });

    if (!car) {
      res.status(404).json({ message: 'Car not found.' });
      return;
    }

    if (car.status === 'excluido') {
      res
        .status(400)
        .json({ message: 'Cars with "excluido" status cannot be modified.' });
      return;
    }

    if (status && status !== 'ativo' && status !== 'inativo') {
      res
        .status(400)
        .json({ message: 'Invalid status. It must be "ativo" or "inativo".' });
      return;
    }

    const updatedData = {
      plate: plate ?? car.plate,
      brand: brand ?? car.brand,
      model: model ?? car.model,
      km: km ?? car.km,
      year: year ?? car.year,
      dailyPrice: dailyPrice ?? car.dailyPrice,
      status: status === undefined ? car.status : status,
    };

    if (dailyPrice && dailyPrice <= 0) {
      res.status(400).json({ message: 'Invalid daily price.' });
      return;
    }

    await car.update(updatedData);

    res.status(200).json({ car: updatedData });
  } catch (error) {
    res.status(500).json({ message: 'Error updating car.', error });
  }
};
