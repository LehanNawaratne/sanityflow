import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  getAllBlogPostsHandler,
  getBlogPostByIdHandler,
  createBlogPostHandler,
  updateBlogPostHandler,
  deleteBlogPostHandler,
} from '../blog.controllers.js';
import {
  getAllBlogPostsService,
  getBlogPostByIdService,
  createBlogPostService,
  updateBlogPostService,
  deleteBlogPostService,
} from '../../services/blog.service.js';
import {
  getBlogPostsQuerySchema,
  blogPostIdParamSchema,
  createBlogPostSchema,
  updateBlogPostSchema,
} from '../../validations/blog.schemas.js';

jest.mock('../../services/blog.service.js', () => ({
  getAllBlogPostsService: jest.fn(),
  getBlogPostByIdService: jest.fn(),
  createBlogPostService: jest.fn(),
  updateBlogPostService: jest.fn(),
  deleteBlogPostService: jest.fn(),
}));

jest.mock('../../validations/blog.schemas.js', () => ({
  getBlogPostsQuerySchema: { parse: jest.fn() },
  blogPostIdParamSchema: { parse: jest.fn() },
  createBlogPostSchema: { parse: jest.fn() },
  updateBlogPostSchema: { parse: jest.fn() },
}));

const createMockRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };

  return res;
};

describe('blog.controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllBlogPostsHandler should return 200 with result', async () => {
    const req = { query: { page: '1' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const parsedQuery = { page: 1, limit: 10 };
    const result = { data: [{ id: 'p1' }] };

    (getBlogPostsQuerySchema.parse as jest.Mock).mockReturnValue(parsedQuery);
    (getAllBlogPostsService as jest.MockedFunction<typeof getAllBlogPostsService>).mockResolvedValue(result as any);

    await getAllBlogPostsHandler(req, res as any, next);

    expect(getBlogPostsQuerySchema.parse).toHaveBeenCalledWith(req.query);
    expect(getAllBlogPostsService).toHaveBeenCalledWith(parsedQuery);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('getBlogPostByIdHandler should return 200 with a post', async () => {
    const req = { params: { id: 'raw-id' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const post = { id: 'post-1', title: 'Hello' };

    (blogPostIdParamSchema.parse as jest.Mock).mockReturnValue({ id: 'post-1' });
    (getBlogPostByIdService as jest.MockedFunction<typeof getBlogPostByIdService>).mockResolvedValue(post as any);

    await getBlogPostByIdHandler(req, res as any, next);

    expect(getBlogPostByIdService).toHaveBeenCalledWith('post-1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(post);
  });

  it('createBlogPostHandler should return 201 with new post', async () => {
    const req = { body: { title: 'New' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const parsedBody = { title: 'New', content: 'Body', tags: ['general'], status: 'Draft' };
    const created = { id: 'post-2', ...parsedBody };

    (createBlogPostSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (createBlogPostService as jest.MockedFunction<typeof createBlogPostService>).mockResolvedValue(created as any);

    await createBlogPostHandler(req, res as any, next);

    expect(createBlogPostService).toHaveBeenCalledWith(parsedBody as any);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  it('updateBlogPostHandler should return 200 with updated post', async () => {
    const req = { params: { id: 'raw-id' }, body: { title: 'Updated' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const parsedBody = { title: 'Updated' };
    const updated = { id: 'post-3', title: 'Updated' };

    (blogPostIdParamSchema.parse as jest.Mock).mockReturnValue({ id: 'post-3' });
    (updateBlogPostSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (updateBlogPostService as jest.MockedFunction<typeof updateBlogPostService>).mockResolvedValue(updated as any);

    await updateBlogPostHandler(req, res as any, next);

    expect(updateBlogPostService).toHaveBeenCalledWith('post-3', parsedBody);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('deleteBlogPostHandler should return 204', async () => {
    const req = { params: { id: 'raw-id' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    (blogPostIdParamSchema.parse as jest.Mock).mockReturnValue({ id: 'post-4' });
    (deleteBlogPostService as jest.MockedFunction<typeof deleteBlogPostService>).mockResolvedValue(undefined as any);

    await deleteBlogPostHandler(req, res as any, next);

    expect(deleteBlogPostService).toHaveBeenCalledWith('post-4');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should call next(error) when service throws in getAllBlogPostsHandler', async () => {
    const req = { query: {} } as any;
    const res = createMockRes();
    const next = jest.fn();
    const error = new Error('Database failed');

    (getBlogPostsQuerySchema.parse as jest.Mock).mockReturnValue({});
    (getAllBlogPostsService as jest.MockedFunction<typeof getAllBlogPostsService>).mockRejectedValue(error);

    await getAllBlogPostsHandler(req, res as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
