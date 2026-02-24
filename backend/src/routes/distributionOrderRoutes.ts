import express from 'express';
import { 
  createDistributionOrder, 
  getAllDistributionOrders, 
  getDistributionOrderById, 
  updateDistributionOrder, 
  updateDeliveryStatus, 
  deleteDistributionOrder 
} from '../controllers/distributionOrderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createDistributionOrder);
router.get('/', auth, getAllDistributionOrders);
router.get('/:id', auth, getDistributionOrderById);
router.put('/:id', auth, updateDistributionOrder);
router.put('/:id/status', auth, updateDeliveryStatus);
router.delete('/:id', auth, deleteDistributionOrder);

export default router;
