import express from 'express';
import {
  createWaterQualityTest,
  getAllWaterQualityTests,
  getWaterQualityTestById,
  updateWaterQualityTest,
  deleteWaterQualityTest
} from '../controllers/waterQualityController.js';

const router = express.Router();

router.post('/tests', createWaterQualityTest);
router.get('/tests', getAllWaterQualityTests);
router.get('/tests/:id', getWaterQualityTestById);
router.put('/tests/:id', updateWaterQualityTest);
router.delete('/tests/:id', deleteWaterQualityTest);

export default router;