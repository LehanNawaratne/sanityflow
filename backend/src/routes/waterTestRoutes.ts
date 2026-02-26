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

// POST /api/v1/water-tests — Record a new water quality test
router.post('/', auth, createWaterTestController);

// GET /api/v1/water-tests — Retrieve all test records (filter by source/date)
router.get('/', auth, getWaterTestsController);

// GET /api/v1/water-tests/analytics — Retrieve aggregated water quality trends
// Must be declared before /:id to avoid "analytics" being captured as an id param
router.get('/analytics', auth, getWaterTestAnalyticsController);

// GET /api/v1/water-tests/:id — Retrieve a specific test result
router.get('/:id', auth, getWaterTestByIdController);

// PUT /api/v1/water-tests/:id — Correct or update a test record
router.put('/:id', auth, updateWaterTestController);

// DELETE /api/v1/water-tests/:id — Remove an erroneous test record
router.delete('/:id', auth, deleteWaterTestController);

export default router;