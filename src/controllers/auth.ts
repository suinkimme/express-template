import { Request, Response } from 'express';
import * as model from 'models/auth';

// utils
import { sign, refresh, setRedisData } from 'utils';

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
    return res.status(503).json({
      status: 503,
      code: 'service_unavailable',
      message:
        '데이터베이스와의 연결이 일시적으로 끊겼습니다. 나중에 다시 시도하세요.',
    });
  }
};
