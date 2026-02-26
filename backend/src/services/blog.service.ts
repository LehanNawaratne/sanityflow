import BlogPost from '../models/BlogPost.js';
import type { IBlogPost } from '../models/BlogPost.js';
import type { CreateBlogPostData, UpdateBlogPostData, GetBlogPostsQuery } from '../types/blog.schemas.js';

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
      .populate('author', 'name email')
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
  const post = await BlogPost.findById(id).populate('author', 'name email');
  if (!post) {
    throw new Error('Blog post not found');
  }
  return post;
};

export const createBlogPostService = async (data: CreateBlogPostData): Promise<IBlogPost> => {
  const existingPost = await BlogPost.findOne({ slug: data.slug });
  if (existingPost) {
    throw new Error('A blog post with this slug already exists');
  }

  const post = new BlogPost(data);
  return await post.save();
};

export const updateBlogPostService = async (id: string, data: UpdateBlogPostData): Promise<IBlogPost> => {
  if (data.slug) {
    const existingPost = await BlogPost.findOne({ slug: data.slug, _id: { $ne: id } });
    if (existingPost) {
      throw new Error('A blog post with this slug already exists');
    }
  }

  // If status is being set to Published, set publishedAt if not already set
  const updatePayload: Record<string, unknown> = { ...data };
  if (data.status === 'Published') {
    const existing = await BlogPost.findById(id).select('publishedAt');
    if (existing && !existing.publishedAt) {
      updatePayload.publishedAt = new Date();
    }
  }

  const post = await BlogPost.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  }).populate('author', 'name email');

  if (!post) {
    throw new Error('Blog post not found');
  }

  return post;
};

export const deleteBlogPostService = async (id: string): Promise<void> => {
  const post = await BlogPost.findByIdAndDelete(id);
  if (!post) {
    throw new Error('Blog post not found');
  }
};
