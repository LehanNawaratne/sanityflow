import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IIssue extends Document {
  issueType: 'Water Quality' | 'Water Shortage' | 'Infrastructure' | 'Other';
  description: string;
  location: string;
  photo?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Resolved';
  reporter: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  resolutionNotes?: string;
}

const issueSchema = new mongoose.Schema<IIssue>({
  issueType: {
    type: String,
    enum: ['Water Quality', 'Water Shortage', 'Infrastructure', 'Other'],
    required: true
  },
  description: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolutionNotes: { type: String }
}, { timestamps: true });

export default mongoose.model<IIssue>('Issue', issueSchema);