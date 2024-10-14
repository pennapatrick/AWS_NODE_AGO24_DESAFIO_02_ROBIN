import { Request, Response } from 'express';
import { User } from '../../models/Users/User';

export const listUsers = (req: Request, res: Response): void => {
  User.findAll({ where: { deletedAt: null } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving users', error });
    });
};
