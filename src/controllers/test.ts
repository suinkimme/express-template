import { Request, Response } from 'express';
// import * as model from 'models/test';

// POST
export const post = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    code: 'success',
    message: 'POST 통신 성공!',
    data: {
      ...req.body,
    },
  });
};

// GET
export const get = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    code: 'success',
    message: 'GET 통신 성공!',
    data: {
      ...req.query,
    },
  });
};

// PUT
export const put = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    code: 'success',
    message: 'PUT 통신 성공!',
    data: {
      ...req.body,
    },
  });
};

// DELETE
export const del = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    code: 'success',
    message: 'DELETE 통신 성공!',
    data: {
      ...req.body,
    },
  });
};
