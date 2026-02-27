import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IForumReply extends Document {
  thread: mongoose.Types.ObjectId;
  content: string;
  author: mongoose.Types.ObjectId;
}

const forumReplySchema = new mongoose.Schema<IForumReply>(
  {
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'ForumThread', required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Index for fast reply lookups by thread
forumReplySchema.index({ thread: 1, createdAt: 1 });

export default mongoose.model<IForumReply>('ForumReply', forumReplySchema);
