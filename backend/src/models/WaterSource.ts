import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IWaterSource extends Document {
  name: string;
  type: 'well' | 'tap' | 'borehole';
  location: string;
  capacity: number;
  condition: 'Good' | 'Fair' | 'Poor';
  isActive: boolean;
  notes?: string;
}

const waterSourceSchema = new mongoose.Schema<IWaterSource>({
  name: { type: String, required: true },
  type: { type: String, enum: ['well', 'tap', 'borehole'], required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, min: 0 },
  condition: { type: String, enum: ['Good', 'Fair', 'Poor'], required: true, default: 'Good' },
  isActive: { type: Boolean, default: true },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model<IWaterSource>('WaterSource', waterSourceSchema);
