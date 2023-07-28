import express from 'express';
import * as controller from '../../src/controllers/admin';

const router = express.Router();

router.get('/admin', controller.getAdmin);
router.post('/admin', controller.createAdmin);

export default router;
