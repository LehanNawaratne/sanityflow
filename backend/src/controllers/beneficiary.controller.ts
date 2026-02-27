import type { Request, Response } from 'express';
import { createBeneficiarySchema, updateBeneficiarySchema } from '../validations/beneficiary.schemas.js';
import { createBeneficiary, getAllBeneficiaries, getBeneficiaryById, updateBeneficiary, deleteBeneficiary } from '../services/beneficiary.service.js';

export const createBeneficiaryController = async (req: Request, res: Response) => {
  try {
    const parsed = createBeneficiarySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    const beneficiary = await createBeneficiary(parsed.data);
    res.status(201).json(beneficiary);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errMsg });
  }
};

export const getAllBeneficiariesController = async (req: Request, res: Response) => {
  try {
    const { eligibilityStatus } = req.query;
    const beneficiaries = await getAllBeneficiaries(
      eligibilityStatus ? { eligibilityStatus: eligibilityStatus as 'Active' | 'Inactive' } : undefined
    );
    res.status(200).json(beneficiaries);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errMsg });
  }
};

export const getBeneficiaryByIdController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid beneficiary ID' });
    const beneficiary = await getBeneficiaryById(id);
    res.status(200).json(beneficiary);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};

export const updateBeneficiaryController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid beneficiary ID' });
    const parsed = updateBeneficiarySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.issues });
    }
    const updateData = Object.fromEntries(
      Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
    );
    const beneficiary = await updateBeneficiary(id, updateData);
    res.status(200).json(beneficiary);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};

export const deleteBeneficiaryController = async (req: Request, res: Response) => {
  try {
    const id = typeof req.params.id === 'string' ? req.params.id : Array.isArray(req.params.id) ? req.params.id[0] : '';
    if (!id) return res.status(400).json({ error: 'Invalid beneficiary ID' });
    const beneficiary = await deleteBeneficiary(id);
    res.status(200).json({ message: 'Beneficiary deleted', beneficiary });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(404).json({ error: errMsg });
  }
};
