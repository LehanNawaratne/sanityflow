import express from 'express';
import { createWaterTest, getWaterTests, updateWaterTest, deleteWaterTest } from '../controllers/waterTestController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/water-tests - Create a new water quality test
router.post('/', auth, createWaterTest);

// GET /api/v1/water-tests - Get all water quality tests
router.get('/', auth, getWaterTests);

// PUT /api/v1/water-tests/:id - Update a water quality test
router.put('/:id', auth, updateWaterTest);

// DELETE /api/v1/water-tests/:id - Delete a water quality test
router.delete('/:id', auth, deleteWaterTest);

export default router;