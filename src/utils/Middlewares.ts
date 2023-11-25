import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// utils
import { verify } from './Jwt';
import { HTTP_ERROR } from './Constants';

// 데이터 유효성 검사
export const validateData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

// 토큰 유효성 검사
export const validateAccessToken = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    const accessTokenResult: any = verify(accessToken);

    if (accessTokenResult.status) {
      return next();
    } else {
      return res.status(401).json({
        status: 401,
        code: 'unauthorized',
        message: '액세스 토큰이 만료되었습니다.',
      });
    }
  } else {
    return res
      .status(HTTP_ERROR.authenticationRequired.status)
      .json(HTTP_ERROR.authenticationRequired);
  }
};
