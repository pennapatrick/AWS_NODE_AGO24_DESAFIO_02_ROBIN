import { Request, Response } from 'express';
import { User } from '../../models/Users/User';

export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  User.findOne({ where: { id, deletedAt: null } })
    .then((existingUser) => {
      if (!existingUser) {
        return Promise.reject({ status: 404, message: 'User not found' });
      }
      return existingUser.update({ deletedAt: new Date() });
    })
    .then(() => {
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error at deleting user', error });
      }
    });
};
