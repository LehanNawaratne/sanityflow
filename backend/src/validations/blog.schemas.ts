import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  summary: z.string().max(500, 'Summary must be at most 500 characters').optional(),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.url('Cover image must be a valid URL').optional(),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(['Draft', 'Published']).default('Draft'),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters').optional(),
  summary: z.string().max(500, 'Summary must be at most 500 characters').optional(),
  content: z.string().min(1, 'Content is required').optional(),
  coverImage: z.url('Cover image must be a valid URL').optional(),
  tags: z.array(z.string().min(1)).optional(),
  status: z.enum(['Draft', 'Published']).optional(),
});

export const blogPostIdParamSchema = z.object({
  id: z.string().min(1, 'Post ID is required'),
});

export const getBlogPostsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['Draft', 'Published']).optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});

export type CreateBlogPostData = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostData = z.infer<typeof updateBlogPostSchema>;
export type BlogPostIdParam = z.infer<typeof blogPostIdParamSchema>;
export type GetBlogPostsQuery = z.infer<typeof getBlogPostsQuerySchema>;
