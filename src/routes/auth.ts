import express from 'express';
import * as controller from 'controllers/auth';
import { body } from 'express-validator';

// utils
import { validate } from 'utils';

const router = express.Router();

router.post(
  '/login',
  [
    body('id').isString().notEmpty(),
    body('password').isString().notEmpty(),
    validate,
  ],
  controller.login,
);

export default router;
