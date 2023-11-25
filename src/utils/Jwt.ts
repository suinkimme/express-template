import jwt from 'jsonwebtoken';

// utils
import { getRedisData } from './Redis';

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY!;

export const sign = (userId: string) => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: 30,
  });
};

export const verify = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, JWT_SECRET_KEY);
    return {
      status: true,
      data: {
        userId: decoded.userId,
      },
    };
  } catch (err) {
    return {
      status: false,
    };
  }
};

export const refresh = () => {
  return jwt.sign({}, JWT_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: 60,
  });
};

export const refreshVerify = async (token: string, userId: string) => {
  try {
    const savedRefreshToken = await getRedisData(userId);

    // 등록된 리프레시 토큰인지 검사
    if (token === savedRefreshToken) {
      // 토큰이 달라졌는지 검사
      jwt.verify(token, JWT_SECRET_KEY);
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (err) {
    return {
      status: false,
    };
  }
};
