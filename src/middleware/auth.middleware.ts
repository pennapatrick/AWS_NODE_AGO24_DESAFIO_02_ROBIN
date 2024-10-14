import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/Users/User';
import { UserAttributes } from '../models/Users/User';

interface TokenPayload {
  id: string;
  email: string;
}

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  const user: UserAttributes | null = await User.findOne({
    where: { email, deletedAt: null },
  });

  console.log('User:', user);

  if (!user) {
    return res.status(404).json({ message: 'User not found or deleted' });
  }

  const isPasswordValid: boolean = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const secretKey = process.env.JWT_SECRET || '123';
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: '10m',
  });

  return res.status(200).json({ token });
};

export const authorize: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || '123';
    const decoded = jwt.verify(token, secretKey) as TokenPayload;

    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
