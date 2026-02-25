import express from 'express';
import { 
  createWaterTestController, 
  getWaterTestsController, 
  updateWaterTestController, 
  deleteWaterTestController,
  getWaterTestByIdController,
  getWaterTestAnalyticsController
} from '../controllers/waterTestController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/water-tests - Create a new water quality test
router.post('/', auth, createWaterTestController);

// GET /api/v1/water-tests/analytics - Get water quality analytics (BEFORE /:id)
router.get('/analytics', auth, getWaterTestAnalyticsController);

// GET /api/v1/water-tests - Get all water quality tests (with filtering)
router.get('/', auth, getWaterTestsController);

// GET /api/v1/water-tests/:id - Get specific water test by ID
router.get('/:id', auth, getWaterTestByIdController);

// PUT /api/v1/water-tests/:id - Update a water quality test
router.put('/:id', auth, updateWaterTestController);

// DELETE /api/v1/water-tests/:id - Delete a water quality test
router.delete('/:id', auth, deleteWaterTestController);

export default router;