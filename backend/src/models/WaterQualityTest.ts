import mongoose from 'mongoose';

interface IWaterQualityTest extends mongoose.Document {
  location: string;
  date: Date;
  pH: number;
  TDS: number;
  contaminants: string[];
  tester: string;
}

const waterQualityTestSchema = new mongoose.Schema<IWaterQualityTest>({
  location: { type: String, required: true },
  date: { type: Date, required: true },
  pH: { type: Number, required: true },
  TDS: { type: Number, required: true },
  contaminants: [{ type: String }],
  tester: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IWaterQualityTest>('WaterQualityTest', waterQualityTestSchema);