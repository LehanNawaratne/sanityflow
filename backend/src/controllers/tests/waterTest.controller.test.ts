import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createWaterTestController,
  getWaterTestsController,
  getWaterTestAnalyticsController,
  getWaterTestByIdController,
  updateWaterTestController,
  deleteWaterTestController,
} from '../waterTest.controller.js';
import {
  createWaterTestService,
  getAllWaterTestsService,
  getWaterTestByIdService,
  updateWaterTestService,
  deleteWaterTestService,
  getWaterTestAnalyticsService,
} from '../../services/waterTest.service.js';
import {
  createWaterTestSchema,
  updateWaterTestSchema,
  waterTestFilterSchema,
} from '../../validations/waterTest.schema.js';

// Mock the service so we don't hit the real database
jest.mock('../../services/waterTest.service.js', () => ({
  createWaterTestService: jest.fn(),
  getAllWaterTestsService: jest.fn(),
  getWaterTestByIdService: jest.fn(),
  updateWaterTestService: jest.fn(),
  deleteWaterTestService: jest.fn(),
  getWaterTestAnalyticsService: jest.fn(),
}));

// Mock the validation schemas so we control what "parse" returns
jest.mock('../../validations/waterTest.schema.js', () => ({
  createWaterTestSchema: { parse: jest.fn() },
  updateWaterTestSchema: { parse: jest.fn() },
  waterTestFilterSchema: { parse: jest.fn() },
}));

// Helper to build a fake Express response object
const createMockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
});

describe('waterTest.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --- createWaterTestController ---
  it('createWaterTestController should return 201 with the new test', async () => {
    const req = { body: { ph: 7.2 }, user: { userId: 'user-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const parsedBody = { ph: 7.2, turbidity: 0.5, status: 'Safe' } as any;
    const createdTest = { id: 'test-1', ...parsedBody };

    (createWaterTestSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (createWaterTestService as jest.MockedFunction<typeof createWaterTestService>).mockResolvedValue(createdTest as any);

    await createWaterTestController(req, res as any, next);

    expect(createWaterTestSchema.parse).toHaveBeenCalledWith(req.body);
    expect(createWaterTestService).toHaveBeenCalledWith(parsedBody, 'user-1');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTest);
  });

  // --- getWaterTestsController ---
  it('getWaterTestsController should return 200 with all tests', async () => {
    const req = { query: { status: 'Safe' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const parsedFilters = { status: 'Safe' } as any;
    const tests = [{ id: 'test-1' }, { id: 'test-2' }];

    (waterTestFilterSchema.parse as jest.Mock).mockReturnValue(parsedFilters);
    (getAllWaterTestsService as jest.MockedFunction<typeof getAllWaterTestsService>).mockResolvedValue(tests as any);

    await getWaterTestsController(req, res as any, next);

    expect(waterTestFilterSchema.parse).toHaveBeenCalledWith(req.query);
    expect(getAllWaterTestsService).toHaveBeenCalledWith(parsedFilters);
    expect(res.json).toHaveBeenCalledWith(tests);
  });

  // --- getWaterTestAnalyticsController ---
  it('getWaterTestAnalyticsController should return analytics data', async () => {
    const req = { query: { source: 'src-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const analytics = [{ month: 'Jan', avgPh: 7.1 }];
    (getWaterTestAnalyticsService as jest.MockedFunction<typeof getWaterTestAnalyticsService>).mockResolvedValue(analytics as any);

    await getWaterTestAnalyticsController(req, res as any, next);

    expect(getWaterTestAnalyticsService).toHaveBeenCalledWith('src-1');
    expect(res.json).toHaveBeenCalledWith(analytics);
  });

  // --- getWaterTestByIdController ---
  it('getWaterTestByIdController should return 200 with the test', async () => {
    const req = { params: { id: 'test-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const test = { id: 'test-1', ph: 7.2 };
    (getWaterTestByIdService as jest.MockedFunction<typeof getWaterTestByIdService>).mockResolvedValue(test as any);

    await getWaterTestByIdController(req, res as any, next);

    expect(getWaterTestByIdService).toHaveBeenCalledWith('test-1');
    expect(res.json).toHaveBeenCalledWith(test);
  });

  // --- updateWaterTestController ---
  it('updateWaterTestController should return 200 with the updated test', async () => {
    const req = { params: { id: 'test-1' }, body: { ph: 6.8 } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const parsedBody = { ph: 6.8 } as any;
    const updatedTest = { id: 'test-1', ph: 6.8 };

    (updateWaterTestSchema.parse as jest.Mock).mockReturnValue(parsedBody);
    (updateWaterTestService as jest.MockedFunction<typeof updateWaterTestService>).mockResolvedValue(updatedTest as any);

    await updateWaterTestController(req, res as any, next);

    expect(updateWaterTestSchema.parse).toHaveBeenCalledWith(req.body);
    expect(updateWaterTestService).toHaveBeenCalledWith('test-1', parsedBody);
    expect(res.json).toHaveBeenCalledWith(updatedTest);
  });

  // --- deleteWaterTestController ---
  it('deleteWaterTestController should return a success message', async () => {
    const req = { params: { id: 'test-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    (deleteWaterTestService as jest.MockedFunction<typeof deleteWaterTestService>).mockResolvedValue(undefined as any);

    await deleteWaterTestController(req, res as any, next);

    expect(deleteWaterTestService).toHaveBeenCalledWith('test-1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Water quality test deleted successfully' });
  });

  // --- error handling ---
  it('should call next(error) when service throws in getWaterTestsController', async () => {
    const req = { query: {} } as any;
    const res = createMockRes();
    const next = jest.fn();
    const error = new Error('Database failed');

    (waterTestFilterSchema.parse as jest.Mock).mockReturnValue({});
    (getAllWaterTestsService as jest.MockedFunction<typeof getAllWaterTestsService>).mockRejectedValue(error);

    await getWaterTestsController(req, res as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
