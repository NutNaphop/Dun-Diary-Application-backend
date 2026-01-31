import express from 'express';
import * as pressureController from '../controllers/pressureController';
import { validate } from '../middlewares/validateRequest';
import { pressureSchema } from '../models/pressureModel';

const router = express.Router();

router.post('/analyze', validate(pressureSchema), pressureController.analyzePressure);
export default router;