import express from 'express';
import { 
  createWaterTestController, 
  getWaterTestsController,
  getWaterTestAnalyticsController,
  getWaterTestByIdController,
  updateWaterTestController, 
  deleteWaterTestController 
} from '../controllers/waterTestController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/',  createWaterTestController);
router.get('/', getWaterTestsController);
router.get('/analytics',  getWaterTestAnalyticsController);
router.get('/:id',  getWaterTestByIdController);
router.put('/:id',  updateWaterTestController);
router.delete('/:id',  deleteWaterTestController);

export default router;