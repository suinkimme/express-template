import { Request, Response } from 'express';
import { PostAdmin, GetAdmin } from 'types/admin';
import * as model from 'models/admin';

export const createAdmin = async (req: Request, res: Response) => {
  const newAdminInfo: PostAdmin = req.body;
  const name = await model.createAdmin(newAdminInfo);
  res.status(201).json({ name });
};

export const getAdmin = async (req: Request, res: Response) => {
  const adminInfo: Array<GetAdmin> = await model.getAdmin();
  res.send(adminInfo);
};
