import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IIssue extends Document {
  type: string; // Issue type (water contamination, pipe burst, etc.)
  description: string;
  location: string; // Human readable location
  coordinates?: {
    latitude: number;
    longitude: number;
  }; // GPS coordinates
  photo?: string; // Photo URL for evidence
  priority: 'Low' | 'Medium' | 'High';
  area: string; // Area/district for filtering
  status: 'Pending' | 'In Progress' | 'Resolved';
  assignedTo?: mongoose.Types.ObjectId; // Reference to field worker
  resolutionNotes?: string; // Resolution details
  reporter: mongoose.Types.ObjectId; // Reference to User
}

const issueSchema = new mongoose.Schema<IIssue>({
  type: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  photo: { type: String }, // URL to uploaded photo
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  area: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolutionNotes: { type: String },
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IIssue>('Issue', issueSchema);