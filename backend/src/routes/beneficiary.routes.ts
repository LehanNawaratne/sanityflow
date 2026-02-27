import express from 'express';
import {
  createBeneficiaryController,
  getAllBeneficiariesController,
  getBeneficiaryByIdController,
  updateBeneficiaryController,
  deleteBeneficiaryController
} from '../controllers/beneficiary.controller.js';

const router = express.Router();

router.post('/', createBeneficiaryController);
router.get('/', getAllBeneficiariesController);
router.get('/:id', getBeneficiaryByIdController);
router.put('/:id', updateBeneficiaryController);
router.delete('/:id', deleteBeneficiaryController);

export default router;
