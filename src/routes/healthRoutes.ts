import express from 'express';
import * as health from '../controllers/healthController';
const router = express.Router();

router.get('/health', health.sendHealth);

export default router;