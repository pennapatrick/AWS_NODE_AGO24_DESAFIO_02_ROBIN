import { Request, Response } from 'express';
import { authenticate } from '../../middleware/auth.middleware';

export const login = async (req: Request, res: Response) => {
  await authenticate(req, res);
};
