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


router.post('/',  createWaterSourceController);
router.get('/',  getAllWaterSourcesController);
router.get('/:id',  getWaterSourceByIdController);
router.put('/:id',  updateWaterSourceController);
router.delete('/:id',  deleteWaterSourceController);

export default router;
