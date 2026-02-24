import mongoose from 'mongoose';
import type { Document } from 'mongoose';

interface IDistributionOrder extends Document {
  resource: string;
  quantity: number;
  targetLocation: string;
  status: 'Pending' | 'Assigned' | 'In Transit' | 'Delivered' | 'Failed';
  driver?: mongoose.Types.ObjectId;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
}

const distributionOrderSchema = new mongoose.Schema<IDistributionOrder>({
  resource: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  targetLocation: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Assigned', 'In Transit', 'Delivered', 'Failed'], 
    default: 'Pending',
    required: true 
  },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IDistributionOrder>('DistributionOrder', distributionOrderSchema);
