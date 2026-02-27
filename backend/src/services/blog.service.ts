import BlogPost from '../models/BlogPost.js';
import type { IBlogPost } from '../models/BlogPost.js';
import type { CreateBlogPostData, UpdateBlogPostData, GetBlogPostsQuery } from '../validations/blog.schemas.js';
import { AppError } from '../utils/errorHandler.js';
import { HTTP_STATUS } from '../constants/index.js';

export interface PaginatedBlogPosts {
  posts: IBlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAllBlogPostsService = async (query: GetBlogPostsQuery): Promise<PaginatedBlogPosts> => {
  const { page, limit, status, tag, search } = query;

  const filter: Record<string, unknown> = {};

  if (status) {
    filter.status = status;
  }

  if (tag) {
    filter.tags = tag;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { summary: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  return {
    posts,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getBlogPostByIdService = async (id: string): Promise<IBlogPost> => {
  const post = await BlogPost.findById(id);
  if (!post) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Blog post not found');
  }
  return post;
};

export const createBlogPostService = async (data: CreateBlogPostData): Promise<IBlogPost> => {
  const post = new BlogPost(data);
  if (data.status === 'Published' && !post.publishedAt) {
    post.publishedAt = new Date();
  }
  return await post.save();
};

export const updateBlogPostService = async (id: string, data: UpdateBlogPostData): Promise<IBlogPost> => {
  const updatePayload: Record<string, unknown> = { ...data };

  if (data.status === 'Published') {
    updatePayload.publishedAt = new Date();
  }

  const post = await BlogPost.findByIdAndUpdate(
    id,
    { $set: updatePayload },
    { new: true, runValidators: true },
  );

  if (!post) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Blog post not found');
  }

  return post;
};

export const deleteBlogPostService = async (id: string): Promise<void> => {
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, 'Blog post not found');
  }
};
