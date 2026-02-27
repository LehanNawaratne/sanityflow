import DistributionOrder from '../models/DistributionOrder.js';
import { Resource } from '../models/resource.model.js';
import { InventoryTransaction } from '../models/inventoryTransaction.model.js';
import mongoose from 'mongoose';
import { AppError } from '../utils/errorHandler.js';

export const createDistributionOrder = async (data: {
  resource: string;
  quantity: number;
  targetLocation: string;
  notes?: string | undefined;
  createdBy: string;
}) => {
  const resource = await Resource.findById(data.resource);
  if (!resource) throw new AppError(404, 'Resource not found');
  if (resource.quantity < data.quantity) throw new AppError(400, 'Insufficient stock');

  const order = await DistributionOrder.create({ ...data, status: 'Pending' });

  await Resource.findByIdAndUpdate(data.resource, { $inc: { quantity: -data.quantity } });
  await InventoryTransaction.create({
    product: data.resource,
    type: 'REMOVE',
    quantity: data.quantity,
    user: data.createdBy,
    reason: `Distribution order ${order._id} created`
  });

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
    throw new AppError(400, 'Invalid order ID');
  }
  
  const order = await DistributionOrder.findById(id)
    .populate('driver', 'name email')
    .populate('createdBy', 'name email');
  
  if (!order) {
    throw new AppError(404, 'Distribution order not found');
  }
  
  return order;
};

export const updateDistributionOrder = async (
  id: string,
  data: { driver?: string | undefined; notes?: string | undefined }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid order ID');
  }
  
  const updateData: any = {};
  if (data.notes !== undefined) updateData.notes = data.notes;
  
  if (data.driver) {
    if (!mongoose.Types.ObjectId.isValid(data.driver)) {
      throw new AppError(400, 'Invalid driver ID');
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
    throw new AppError(404, 'Distribution order not found');
  }
  
  return order;
};

export const updateDeliveryStatus = async (id: string, status: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid order ID');
  }
  
  const order = await DistributionOrder.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).populate('driver', 'name email').populate('createdBy', 'name email');
  
  if (!order) {
    throw new AppError(404, 'Distribution order not found');
  }
  
  // TODO: Send SMS/email notification to beneficiary
  
  return order;
};

export const deleteDistributionOrder = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, 'Invalid order ID');
  }
  
  const order = await DistributionOrder.findByIdAndDelete(id);
  
  if (!order) {
    throw new AppError(404, 'Distribution order not found');
  }

  if (['Pending', 'Assigned'].includes(order.status)) {
    await Resource.findByIdAndUpdate(order.resource, { $inc: { quantity: order.quantity } });
    await InventoryTransaction.create({
      product: order.resource,
      type: 'ADD',
      quantity: order.quantity,
      user: order.createdBy,
      reason: `Distribution order ${order._id} cancelled`
    });
  }

  return order;
};
