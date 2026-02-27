import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IForumThread extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  status: 'Open' | 'Closed';
  replyCount: number;
}

const forumThreadSchema = new mongoose.Schema<IForumThread>(
  {
    title: { type: String, required: true, maxlength: 200 },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    replyCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

forumThreadSchema.index({ status: 1, createdAt: -1 });
forumThreadSchema.index({ tags: 1 });

export default mongoose.model<IForumThread>('ForumThread', forumThreadSchema);
