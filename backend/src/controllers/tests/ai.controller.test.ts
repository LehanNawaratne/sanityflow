import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { summarizeBlogPostHandler } from '../ai.controller.js';
import { summarizeBlogPostService } from '../../services/ai.service.js';
import { blogPostIdParamSchema } from '../../validations/blog.schemas.js';

jest.mock('../../services/ai.service.js', () => ({
  summarizeBlogPostService: jest.fn(),
}));

jest.mock('../../validations/blog.schemas.js', () => ({
  blogPostIdParamSchema: {
    parse: jest.fn(),
  },
}));

const mockedSummarizeBlogPostService = summarizeBlogPostService as jest.MockedFunction<typeof summarizeBlogPostService>;
const parseBlogPostId = blogPostIdParamSchema.parse as jest.Mock;

const createMockRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  return res;
};

describe('ai.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should summarize a blog post and return 200', async () => {
    const req = { params: { id: 'raw-id' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const serviceResult = { summary: 'Short summary' };

    parseBlogPostId.mockReturnValue({ id: 'blog-1' });
    mockedSummarizeBlogPostService.mockResolvedValue(serviceResult as any);

    await summarizeBlogPostHandler(req, res as any, next);

    expect(parseBlogPostId).toHaveBeenCalledWith(req.params);
    expect(mockedSummarizeBlogPostService).toHaveBeenCalledWith('blog-1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(serviceResult);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next(error) when schema parsing fails', async () => {
    const req = { params: {} } as any;
    const res = createMockRes();
    const next = jest.fn();
    const error = new Error('Invalid params');

    parseBlogPostId.mockImplementation(() => {
      throw error;
    });

    await summarizeBlogPostHandler(req, res as any, next);

    expect(mockedSummarizeBlogPostService).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});
