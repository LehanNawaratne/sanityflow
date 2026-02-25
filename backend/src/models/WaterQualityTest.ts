import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IWaterQualityTest extends Document {
  location: string;
  testDate: Date;
  pH: number;
  tds: number; // Total Dissolved Solids
  turbidity: number; // Turbidity measurement
  contaminants: string[]; // Array of detected contaminants
  status: 'Safe' | 'Unsafe';
  tester: mongoose.Types.ObjectId; // Reference to User
  notes?: string;
}

const waterQualityTestSchema = new mongoose.Schema<IWaterQualityTest>({
  location: { type: String, required: true },
  testDate: { type: Date, required: true, default: Date.now },
  pH: { type: Number, required: true, min: 0, max: 14 },
  tds: { type: Number, required: true, min: 0 },
  turbidity: { type: Number, required: true, min: 0 },
  contaminants: [{ type: String }],
  status: { type: String, enum: ['Safe', 'Unsafe'], required: true },
  tester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model<IWaterQualityTest>('WaterQualityTest', waterQualityTestSchema);