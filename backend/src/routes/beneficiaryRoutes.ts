import { Router } from 'express';
import {
  createBeneficiaryController,
  getAllBeneficiariesController,
  getBeneficiaryByIdController,
  updateBeneficiaryController,
  deleteBeneficiaryController
} from '../controllers/beneficiaryController.js';

const router = Router();

// Register a new beneficiary
router.post('/api/beneficiaries', createBeneficiaryController);

// Retrieve all beneficiaries (optionally filter by eligibility status)
router.get('/api/beneficiaries', getAllBeneficiariesController);

// Get a single beneficiary's details
router.get('/api/beneficiaries/:id', getBeneficiaryByIdController);

// Update beneficiary information or eligibility
router.put('/api/beneficiaries/:id', updateBeneficiaryController);

// Remove a beneficiary record
router.delete('/api/beneficiaries/:id', deleteBeneficiaryController);

export default router;
