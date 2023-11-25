import express from 'express';
import * as controller from 'controllers/auth';
import { body } from 'express-validator';

// utils
import { validate } from 'utils';

const router = express.Router();

// 로그인
router.post(
  '/login',
  [
    body('id').isString().notEmpty(),
    body('password').isString().notEmpty(),
    validate,
  ],
  controller.login,
);

// 액세스 토큰 재발급
router.post(
  '/refresh',
  [body('userId').isString().notEmpty(), validate],
  controller.refreshAccessToken,
);

export default router;
