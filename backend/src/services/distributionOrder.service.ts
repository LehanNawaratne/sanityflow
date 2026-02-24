import DistributionOrder from '../models/DistributionOrder.js';
import mongoose from 'mongoose';

export const createDistributionOrder = async (data: {
  resource: string;
  quantity: number;
  targetLocation: string;
  notes?: string | undefined;
  createdBy: string;
}) => {
  // TODO: Check inventory stock availability (handled by inventory team)
  
  const order = await DistributionOrder.create({
    ...data,
    status: 'Pending'
  });
  
  // TODO: Reserve/deduct inventory (handled by inventory team)
  
  return order;
};

export const getAllDistributionOrders = async (filters?: {
  status?: string;
  driver?: string;
}) => {
  const query: any = {};
  
  if (filters?.status) query.status = filters.status;
  if (filters?.driver) query.driver = filters.driver;
  
  return await DistributionOrder.find(query)
    .populate('driver', 'name email')
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
};

export const getDistributionOrderById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid order ID');
  }
  
  const order = await DistributionOrder.findById(id)
    .populate('driver', 'name email')
    .populate('createdBy', 'name email');
  
  if (!order) {
    throw new Error('Distribution order not found');
  }
  
  return order;
};

export const updateDistributionOrder = async (
  id: string,
  data: { driver?: string | undefined; notes?: string | undefined }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid order ID');
  }
  
  const updateData: any = {};
  if (data.notes !== undefined) updateData.notes = data.notes;
  
  if (data.driver) {
    if (!mongoose.Types.ObjectId.isValid(data.driver)) {
      throw new Error('Invalid driver ID');
    }
    updateData.driver = data.driver;
    updateData.status = 'Assigned';
    // TODO: Send notification to driver
  }
  
  const order = await DistributionOrder.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate('driver', 'name email').populate('createdBy', 'name email');
  
  if (!order) {
    throw new Error('Distribution order not found');
  }
  
  return order;
};

export const updateDeliveryStatus = async (id: string, status: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid order ID');
  }
  
  const order = await DistributionOrder.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('driver', 'name email').populate('createdBy', 'name email');
  
  if (!order) {
    throw new Error('Distribution order not found');
  }
  
  // TODO: Send SMS/email notification to beneficiary
  
  return order;
};

export const deleteDistributionOrder = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid order ID');
  }
  
  const order = await DistributionOrder.findByIdAndDelete(id);
  
  if (!order) {
    throw new Error('Distribution order not found');
  }
  
  // TODO: Release reserved inventory (handled by inventory team)
  
  return order;
};
