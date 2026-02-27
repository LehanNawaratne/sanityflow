import type { Request, Response, NextFunction } from 'express';
import { summarizeBlogPostService } from '../services/ai.service.js';
import { blogPostIdParamSchema } from '../validations/blog.schemas.js';

export const summarizeBlogPostHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = blogPostIdParamSchema.parse(req.params);
    const result = await summarizeBlogPostService(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
