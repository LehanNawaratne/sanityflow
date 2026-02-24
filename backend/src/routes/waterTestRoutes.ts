import express from 'express';
import { 
  createWaterTestController, 
  getWaterTestsController, 
  updateWaterTestController, 
  deleteWaterTestController 
} from '../controllers/waterTestController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/water-tests - Create a new water quality test
router.post('/', auth, createWaterTestController);

// GET /api/v1/water-tests - Get all water quality tests
router.get('/', auth, getWaterTestsController);

// PUT /api/v1/water-tests/:id - Update a water quality test
router.put('/:id', auth, updateWaterTestController);

// DELETE /api/v1/water-tests/:id - Delete a water quality test
router.delete('/:id', auth, deleteWaterTestController);

export default router;