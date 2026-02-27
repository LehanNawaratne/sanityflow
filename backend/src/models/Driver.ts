import mongoose, { Schema, Document } from 'mongoose';

export interface IDriver extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  contact: string;
  vehicleInfo: string;
  assignedArea: string;
  availability: 'Active' | 'Inactive';
}

const DriverSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  vehicleInfo: { type: String, required: true },
  assignedArea: { type: String, required: true },
  availability: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IDriver>('Driver', DriverSchema);
