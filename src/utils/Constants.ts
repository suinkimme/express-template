export const HTTP_ERROR = {
  serviceUnavailable: {
    status: 503,
    code: 'service_unavailable',
    message:
      '데이터베이스와의 연결이 일시적으로 끊겼습니다. 나중에 다시 시도하세요.',
  },
  authenticationRequired: {
    status: 400,
    code: 'authentication_required',
    message: '인증 토큰이 누락되었습니다.',
  },
  badRequest: {
    status: 400,
    code: 'bad_request',
    message: '요청이 부적절하거나 유효하지 않습니다.',
  },
};

export const HTTP_SUCCESS = {
  noContent: {
    status: 204,
    code: 'no_content',
    message: '성공적으로 삭제되었습니다.',
  },
};
