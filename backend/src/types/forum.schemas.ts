import { z } from 'zod';

export const createThreadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string().min(1)).default([]),
  status: z.enum(['Open', 'Closed']).default('Open'),
});

export const updateThreadSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  status: z.enum(['Open', 'Closed']).optional(),
});

export const createReplySchema = z.object({
  content: z.string().min(1, 'Reply content is required'),
});

export const getThreadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['Open', 'Closed']).optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
});

export const threadIdParamSchema = z.object({
  id: z.string().min(1, 'Thread ID is required'),
});

export const replyParamSchema = z.object({
  id: z.string().min(1, 'Thread ID is required'),
  replyId: z.string().min(1, 'Reply ID is required'),
});

export type CreateThreadData = z.infer<typeof createThreadSchema>;
export type UpdateThreadData = z.infer<typeof updateThreadSchema>;
export type CreateReplyData = z.infer<typeof createReplySchema>;
export type GetThreadsQuery = z.infer<typeof getThreadsQuerySchema>;
