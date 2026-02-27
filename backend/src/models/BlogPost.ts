import mongoose from 'mongoose';
import type { Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  summary?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  status: 'Draft' | 'Published';
  publishedAt?: Date;
}

const blogPostSchema = new mongoose.Schema<IBlogPost>(
  {
    title: { type: String, required: true, maxlength: 200 },
    summary: { type: String, maxlength: 500 },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Automatically set publishedAt when status changes to Published
blogPostSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'Published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ tags: 1 });

export default mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
