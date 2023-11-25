// types
import { FetchRes } from 'types/fetch';
import { LoginUser } from 'types/auth';

export const checkCredentials = async ({
  id,
  password,
}: LoginUser): Promise<FetchRes> => {
  if (id === 'user' && password === '1234') {
    return {
      status: 200,
      code: 'success',
      message: '로그인에 성공했습니다.',
      data: {
        userIdx: 1,
        userId: 'user',
        userName: '홍길동',
        userPhoneNumber: '010-1234-1234',
      },
    };
  }

  if (id === 'blockuser' && password === '1234') {
    return {
      status: 403,
      code: 'user_blocked',
      message: '차단된 사용자입니다. 관리자에게 문의하세요.',
    };
  }

  return {
    status: 401,
    code: 'invalid_credentials',
    message: '아이디 혹은 비밀번호가 잘못되었습니다.',
  };
};
