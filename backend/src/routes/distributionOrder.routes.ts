import express from 'express';
import { 
  createDistributionOrder, 
  getAllDistributionOrders, 
  getDistributionOrderById, 
  updateDistributionOrder, 
  updateDeliveryStatus, 
  deleteDistributionOrder 
} from '../controllers/distributionOrder.controller.js';

const router = express.Router();

router.post('/', createDistributionOrder);
router.get('/', getAllDistributionOrders);
router.get('/:id', getDistributionOrderById);
router.put('/:id', updateDistributionOrder);
router.put('/:id/status', updateDeliveryStatus);
router.delete('/:id', deleteDistributionOrder);

export default router;
