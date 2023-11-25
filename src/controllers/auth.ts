import { Request, Response } from 'express';
import * as model from 'models/auth';

// utils
import {
  sign,
  refresh,
  verify,
  refreshVerify,
  setRedisData,
  HTTP_ERROR,
} from 'utils';

/** 로그인 */
export const login = async (req: Request, res: Response) => {
  try {
    const hasAccount = await model.checkCredentials(req.body);
    const { status, code } = hasAccount;

    // 가입, 차단 사용자 체크
    switch (code) {
      case 'success':
        const userId = hasAccount.data.userId;

        //  토큰 생성
        const accessToken = sign(userId);
        const refreshToken = refresh();

        // Redis에 토큰 저장
        await setRedisData(userId, refreshToken); // userId 말고 사용자가 모르는 특정 값이면 보안에 더 좋을 듯

        return res.status(status).json({
          ...hasAccount,
          data: {
            ...hasAccount.data,
            accessToken,
            refreshToken,
          },
        });
      default:
        return res.status(status).json(hasAccount);
    }
  } catch (err) {
    return res
      .status(HTTP_ERROR.serviceUnavailable.status)
      .json(HTTP_ERROR.serviceUnavailable);
  }
};

/** 액세스 토큰 재발급 */
export const refreshAccessToken = async (req: Request, res: Response) => {
  const { userId } = req.body; // 토큰 재발급 용도

  if (req.headers.authorization && req.headers.refreshtoken) {
    const { authorization, refreshtoken }: any = req.headers;
    const accessToken = authorization.split('Bearer ')[1];

    // 액세스 토큰 검사
    const accessTokenResult = verify(accessToken);
    // 액세스 토큰 유효: true, 만료: false
    if (!accessTokenResult.status) {
      return res.status(401).json({
        status: 401,
        code: 'unauthorized',
        message: '액세스 토큰이 만료되었습니다. 다시 인증하세요.',
      });
    }

    // 액세스 토큰이 만료되었을 때
    if (!accessTokenResult.status) {
      // 리프레시 토큰 만료 검사
      const refreshTokenResult = await refreshVerify(
        refreshtoken,
        accessTokenResult.userId,
      );

      // 리프레시 토큰'도' 만료되었을 때
      if (!refreshTokenResult.status) {
        return res.status(401).json({
          status: 401,
          code: 'refresh_expired',
          message: '리프레시 토큰이 만료되었습니다. 다시 로그인해 주세요.',
        });
      } else {
        // 리프레시 토큰이 유효할 때
        const newAccessToken = sign(userId);
        return res.status(200).json({
          status: 200,
          code: 'token_refreshed',
          message: '액세스 토큰이 성공적으로 재발급되었습니다.',
          data: {
            accessToken: newAccessToken,
            refreshToken: refreshtoken,
          },
        });
      }
    } else {
      // 액세스 토큰이 유효할 때 (만료되지 않았을 때)
      return res.status(400).json({
        status: 400,
        code: 'token_not_expired',
        message:
          '현재 액세스 토큰이 유효합니다. 새 토큰은 만료된 후에만 재발급됩니다.',
      });
    }
  } else {
    // 헤더에 토큰이 포함되어있지 않을 때
    return res.status(400).json({
      status: 400,
      code: 'authentication_required',
      message: '인증 토큰이 누락되었습니다.',
    });
  }
};