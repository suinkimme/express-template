import express from 'express';
import * as controller from 'controllers/admin';

const router = express.Router();

router.get('/', controller.getAdmin);
router.post('/', controller.createAdmin);

export default router;
