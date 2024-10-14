import { Request, Response } from 'express';
import { User } from '../../models/Users/User';
import bcrypt from 'bcryptjs';

export const createUser = (req: Request, res: Response): void => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Complete name required.' });
    return;
  }
  if (!email) {
    res.status(400).json({ message: 'Email is required.' });
    return;
  }
  if (!password) {
    res.status(400).json({ message: 'Password is required.' });
    return;
  }

  User.findOne({ where: { email, deletedAt: null } })
    .then((existingUser) => {
      if (existingUser) {
        return Promise.reject({
          status: 400,
          message: 'Email already exists',
        });
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return User.create({
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        deletedAt: null,
      });
    })
    .then((newUser) => {
      res
        .status(201)
        .json({ message: 'User created successfully', user: newUser });
    })
    .catch((error) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error creating new user', error });
      }
    });
};
