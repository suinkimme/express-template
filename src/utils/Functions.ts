import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    status: 400,
    code: 'missing_data',
    message: '필수 데이터가 누락 되었거나 형식이 올바르지 않습니다.',
  });
};
