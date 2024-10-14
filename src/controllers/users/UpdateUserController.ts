import { Request, Response } from 'express';
import { User } from '../../models/Users/User';
import bcrypt from 'bcryptjs';

export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  User.findOne({ where: { id, deletedAt: null } })
    .then(async (existingUser) => {
      if (!existingUser) {
        return Promise.reject({ status: 404, message: 'User not found' });
      }

      const updates: Partial<{
        name: string;
        email: string;
        password: string;
      }> = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.password = hashedPassword;
        return await existingUser.update(updates);
      }

      return existingUser.update(updates);
    })
    .then((updatedUser) => {
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({
          message: 'Error updating user',
          error,
        });
      }
    });
};
