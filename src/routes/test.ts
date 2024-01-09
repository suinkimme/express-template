import express from 'express';
import * as controller from 'controllers/test';
import { body, query } from 'express-validator';

// utils
import { validateData, validateAccessToken } from 'utils';

const router = express.Router();

// POST
router.post(
  '/post',
  validateAccessToken,
  [body('userIdx').isInt().notEmpty(), validateData],
  controller.post,
);

// GET
router.get(
  '/get',
  validateAccessToken,
  [
    query('userIdx').isInt().notEmpty(),
    query('userId').isString().notEmpty(),
    validateData,
  ],
  controller.get,
);

// PUT
router.put(
  '/put',
  validateAccessToken,
  [
    body('userIdx').isInt().notEmpty(),
    body('userId').isString().notEmpty(),
    body('idx').isInt().notEmpty(),
    validateData,
  ],
  controller.put,
);

// DELETE
router.delete(
  '/delete',
  validateAccessToken,
  [
    body('userIdx').isInt().notEmpty(),
    body('userId').isString().notEmpty(),
    body('idx').isInt().notEmpty(),
    validateData,
  ],
  controller.del,
);

export default router;
