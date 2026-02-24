import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IIssue extends Document {
  description: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  reporter: mongoose.Types.ObjectId; // Reference to User
}

const issueSchema = new mongoose.Schema<IIssue>({
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IIssue>('Issue', issueSchema);