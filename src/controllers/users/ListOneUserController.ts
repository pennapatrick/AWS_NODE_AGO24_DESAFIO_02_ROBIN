import { Request, Response } from 'express';
import { User } from '../../models/Users/User';

export const listOneUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  User.findOne({ where: { id, deletedAt: null } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error retrieving user', error });
    });
};
