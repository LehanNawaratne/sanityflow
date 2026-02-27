import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createWaterSourceController,
  getAllWaterSourcesController,
  getWaterSourceByIdController,
  updateWaterSourceController,
  deleteWaterSourceController,
} from '../waterSource.controller.js';
import {
  createWaterSourceService,
  getAllWaterSourcesService,
  getWaterSourceByIdService,
  updateWaterSourceService,
  deleteWaterSourceService,
} from '../../services/waterSource.service.js';


jest.mock('../../services/waterSource.service.js', () => ({
  createWaterSourceService: jest.fn(),
  getAllWaterSourcesService: jest.fn(),
  getWaterSourceByIdService: jest.fn(),
  updateWaterSourceService: jest.fn(),
  deleteWaterSourceService: jest.fn(),
}));

const createMockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  send: jest.fn(),
});

describe('waterSource.controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createWaterSourceController should return 201 with the new source', async () => {
    const req = { body: { name: 'River A', type: 'River' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const createdSource = { id: 'src-1', name: 'River A', type: 'River' };
    (createWaterSourceService as jest.MockedFunction<typeof createWaterSourceService>).mockResolvedValue(createdSource as any);

    await createWaterSourceController(req, res as any, next);

    expect(createWaterSourceService).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdSource);
  });

  // --- getAllWaterSourcesController ---
  it('getAllWaterSourcesController should return 200 with all sources', async () => {
    const req = { query: { type: 'River', isActive: 'true' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const sources = [{ id: 'src-1' }, { id: 'src-2' }];
    (getAllWaterSourcesService as jest.MockedFunction<typeof getAllWaterSourcesService>).mockResolvedValue(sources as any);

    await getAllWaterSourcesController(req, res as any, next);

    expect(getAllWaterSourcesService).toHaveBeenCalledWith({ type: 'River', isActive: 'true' });
    expect(res.json).toHaveBeenCalledWith(sources);
  });

  it('getAllWaterSourcesController should pass empty filters when no query params', async () => {
    const req = { query: {} } as any;
    const res = createMockRes();
    const next = jest.fn();

    (getAllWaterSourcesService as jest.MockedFunction<typeof getAllWaterSourcesService>).mockResolvedValue([] as any);

    await getAllWaterSourcesController(req, res as any, next);

    expect(getAllWaterSourcesService).toHaveBeenCalledWith({});
  });

  // --- getWaterSourceByIdController ---
  it('getWaterSourceByIdController should return 200 with source and weather merged', async () => {
    const req = { params: { id: 'src-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const sourceData = { id: 'src-1', name: 'River A' };
    const weatherData = { temp: 28, condition: 'Sunny' };

    // The controller calls source.toObject() to spread the source fields
    const mockSource = { toObject: jest.fn().mockReturnValue(sourceData) };
    (getWaterSourceByIdService as jest.MockedFunction<typeof getWaterSourceByIdService>).mockResolvedValue({
      source: mockSource,
      weather: weatherData,
    } as any);

    await getWaterSourceByIdController(req, res as any, next);

    expect(getWaterSourceByIdService).toHaveBeenCalledWith('src-1');
    expect(res.json).toHaveBeenCalledWith({ ...sourceData, weather: weatherData });
  });

  // --- updateWaterSourceController ---
  it('updateWaterSourceController should return 200 with the updated source', async () => {
    const req = { params: { id: 'src-1' }, body: { name: 'Updated River' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    const updatedSource = { id: 'src-1', name: 'Updated River' };
    (updateWaterSourceService as jest.MockedFunction<typeof updateWaterSourceService>).mockResolvedValue(updatedSource as any);

    await updateWaterSourceController(req, res as any, next);

    expect(updateWaterSourceService).toHaveBeenCalledWith('src-1', req.body);
    expect(res.json).toHaveBeenCalledWith(updatedSource);
  });

  // --- deleteWaterSourceController ---
  it('deleteWaterSourceController should return a success message', async () => {
    const req = { params: { id: 'src-1' } } as any;
    const res = createMockRes();
    const next = jest.fn();

    (deleteWaterSourceService as jest.MockedFunction<typeof deleteWaterSourceService>).mockResolvedValue(undefined as any);

    await deleteWaterSourceController(req, res as any, next);

    expect(deleteWaterSourceService).toHaveBeenCalledWith('src-1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Water source deleted successfully' });
  });

  // --- error handling ---
  it('should call next(error) when service throws in createWaterSourceController', async () => {
    const req = { body: { name: 'Bad Source' } } as any;
    const res = createMockRes();
    const next = jest.fn();
    const error = new Error('Validation failed');

    (createWaterSourceService as jest.MockedFunction<typeof createWaterSourceService>).mockRejectedValue(error);

    await createWaterSourceController(req, res as any, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
