import express from 'express';
import * as controller from 'controllers/auth';
import { body } from 'express-validator';

// utils
import { validateData } from 'utils';

const router = express.Router();

// 로그인
router.post(
  '/login',
  [
    body('ip').isIP().notEmpty(),
    body('id').isString().notEmpty(),
    body('password').isString().notEmpty(),
    validateData,
  ],
  controller.login,
);

// 로그아웃
router.post(
  '/logout',
  [
    body('ip').isIP().notEmpty(),
    body('userId').isString().notEmpty(),
    validateData,
  ],
  controller.logout,
);

// 액세스 토큰 재발급
router.post(
  '/refresh',
  [
    body('ip').isIP().notEmpty(),
    body('userId').isString().notEmpty(),
    validateData,
  ],
  controller.refreshAccessToken,
);

export default router;
