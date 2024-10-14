import { Request, Response } from 'express';
import { Order } from '../../models/Orders/Order';
import { Car } from '../../models/Cars/Car';
import axios from 'axios';

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { startDateTime, endDateTime, cep, status } = req.body;

  try {
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (startDateTime) {
      const now = new Date();
      if (new Date(startDateTime) < now) {
        res.status(400).json({ message: 'Start date cannot be in the past' });
        return;
      }
      order.startDateTime = new Date(startDateTime);
    }

    if (endDateTime) {
      if (!order.startDateTime || new Date(endDateTime) < order.startDateTime) {
        res
          .status(400)
          .json({ message: 'End date cannot be before the start date' });
        return;
      }
      order.endDateTime = new Date(endDateTime);
    }

    if (cep) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        const cepData = response.data;

        if (cepData.erro) {
          res.status(404).json({ message: 'CEP not found' });
          return;
        }

        order.cep = cep;
        order.city = cepData.localidade;
        order.uf = cepData.uf;

        const freightRates: { [key: string]: number } = {
          AC: 40.0,
          AL: 30.0,
          AP: 30.0,
          AM: 20.0,
          BA: 50.0,
          CE: 80.0,
          ES: 30.0,
          GO: 80.0,
          MA: 60.0,
          MT: 50.0,
          MS: 50.0,
          MG: 80.0,
          PB: 30.0,
          PR: 40.0,
          PE: 30.0,
          PI: 80.0,
          RJ: 50.0,
          RN: 80.0,
          RS: 80.0,
          RO: 70.0,
          RR: 40.0,
          SC: 50.0,
          SE: 80.0,
          TO: 40.0,
        };
        order.rentalFee = freightRates[cepData.uf] || 170.0;
      } catch (error) {
        res.status(500).json({ message: 'Error fetching CEP data', error });
        return;
      }
    }

    if (status) {
      switch (status) {
        case 'Aprovado':
          if (
            order.status === 'Aberto' &&
            order.startDateTime &&
            order.endDateTime &&
            order.cep
          ) {
            order.status = 'Aprovado';
          } else {
            res
              .status(400)
              .json({
                message:
                  'Cannot approve order. Ensure all fields are filled and order is open',
              });
            return;
          }
          break;
        case 'Cancelado':
          if (order.status === 'Aberto') {
            order.status = 'Cancelado';
            order.cancellationDate = new Date();
          } else {
            res
              .status(400)
              .json({ message: 'Cannot cancel order that is not open' });
            return;
          }
          break;
        case 'Fechado':
          if (order.status === 'Aprovado') {
            const today = new Date();
            order.status = 'Fechado';
            order.closingDate = today;

            if (order.endDateTime && new Date(order.endDateTime) < today) {
              const car = await Car.findOne({ where: { id: order.carId } });
              if (car) {
                const daysOverdue = Math.ceil(
                  (today.getTime() - new Date(order.endDateTime).getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                order.fine = daysOverdue * (car.dailyPrice * 2);
              }
            }
          } else {
            res
              .status(400)
              .json({ message: 'Cannot close order that is not approved' });
            return;
          }
          break;
        default:
          res.status(400).json({ message: 'Invalid status' });
          return;
      }
    }

    if (order.startDateTime && order.endDateTime) {
      const car = await Car.findOne({ where: { id: order.carId } });
      if (car) {
        const rentalDays = Math.ceil(
          (order.endDateTime.getTime() - order.startDateTime.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        order.totalValue =
          rentalDays * car.dailyPrice +
          (order.rentalFee || 0) +
          (order.fine || 0);
      }
    }

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};
