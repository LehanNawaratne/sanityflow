import express from 'express';
import {
  createWaterSourceController,
  getAllWaterSourcesController,
  getWaterSourceByIdController,
  updateWaterSourceController,
  deleteWaterSourceController
} from '../controllers/waterSourceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/water-sources
router.post('/', auth, createWaterSourceController);

// GET /api/v1/water-sources
router.get('/', auth, getAllWaterSourcesController);

// GET /api/v1/water-sources/:id
router.get('/:id', auth, getWaterSourceByIdController);

// PUT /api/v1/water-sources/:id
router.put('/:id', auth, updateWaterSourceController);

// DELETE /api/v1/water-sources/:id
router.delete('/:id', auth, deleteWaterSourceController);

export default router;
