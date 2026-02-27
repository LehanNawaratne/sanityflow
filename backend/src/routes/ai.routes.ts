import { Router } from 'express';
import { summarizeBlogPostHandler } from '../controllers/ai.controller.js';

const aiRouter = Router();


aiRouter.get('/summarize/blog/:id', summarizeBlogPostHandler);

export default aiRouter;
