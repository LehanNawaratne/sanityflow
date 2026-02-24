import Beneficiary from '../models/Beneficiary';
import mongoose from 'mongoose';
import { IBeneficiary } from '../models/Beneficiary';

export const createBeneficiary = async (data: Partial<IBeneficiary>) => {
  // TODO: Send notification to beneficiary (if needed)
  return await Beneficiary.create(data);
};

export const getAllBeneficiaries = async (filters?: { eligibilityStatus?: 'Active' | 'Inactive' }) => {
  const query: any = {};
  if (filters?.eligibilityStatus) query.eligibilityStatus = filters.eligibilityStatus;
  return await Beneficiary.find(query).sort({ createdAt: -1 });
};

export const getBeneficiaryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid beneficiary ID');
  }
  const beneficiary = await Beneficiary.findById(id);
  if (!beneficiary) {
    throw new Error('Beneficiary not found');
  }
  return beneficiary;
};

export const updateBeneficiary = async (id: string, data: Partial<IBeneficiary>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid beneficiary ID');
  }
  const beneficiary = await Beneficiary.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!beneficiary) {
    throw new Error('Beneficiary not found');
  }
  // TODO: Send notification to beneficiary (if needed)
  return beneficiary;
};

export const deleteBeneficiary = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid beneficiary ID');
  }
  const beneficiary = await Beneficiary.findByIdAndDelete(id);
  if (!beneficiary) {
    throw new Error('Beneficiary not found');
  }
  // TODO: Handle related cleanup (if needed)
  return beneficiary;
};
