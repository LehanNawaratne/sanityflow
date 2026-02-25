import WaterQualityTest from '../models/WaterQualityTest.js';
import type { IWaterQualityTest } from '../models/WaterQualityTest.js';

// Business logic for water quality test operations
export const createWaterTestService = async (
  data: { 
    location: string; 
    pH: number; 
    tds: number;
    turbidity: number;
    contaminants: string[]; 
    status: 'Safe' | 'Unsafe'; 
    notes?: string | undefined
  }, 
  userId: string
): Promise<IWaterQualityTest> => {
  // Business rule: Auto-classify based on WHO water quality standards
  let finalStatus = data.status;
  
  // WHO guidelines: pH 6.5-8.5, TDS < 500, turbidity < 1 NTU
  if (data.pH < 6.5 || data.pH > 8.5 || data.tds > 500 || data.turbidity > 1 || data.contaminants.length > 0) {
    finalStatus = 'Unsafe';
  }

  // Create new water test
  const test = new WaterQualityTest({
    ...data,
    status: finalStatus,
    tester: userId
  });

  return await test.save();
};

export const getAllWaterTestsService = async (filters?: {
  location?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}): Promise<IWaterQualityTest[]> => {
  const query: any = {};
  
  if (filters?.location) query.location = { $regex: filters.location, $options: 'i' };
  if (filters?.status) query.status = filters.status;
  if (filters?.startDate || filters?.endDate) {
    query.testDate = {};
    if (filters.startDate) query.testDate.$gte = new Date(filters.startDate);
    if (filters.endDate) query.testDate.$lte = new Date(filters.endDate);
  }

  return await WaterQualityTest.find(query)
    .populate('tester', 'name email')
    .sort({ testDate: -1 });
};

export const updateWaterTestService = async (
  id: string, 
  data: { 
    pH?: number | undefined; 
    tds?: number | undefined;
    turbidity?: number | undefined;
    contaminants?: string[] | undefined; 
    status?: 'Safe' | 'Unsafe' | undefined; 
    notes?: string | undefined
  }
): Promise<IWaterQualityTest> => {
  const test = await WaterQualityTest.findByIdAndUpdate(
    id, 
    data, 
    { new: true, runValidators: true }
  );

  if (!test) {
    throw new Error('Water quality test not found');
  }

  return test;
};

export const deleteWaterTestService = async (id: string): Promise<void> => {
  const test = await WaterQualityTest.findByIdAndDelete(id);
  
  if (!test) {
    throw new Error('Water quality test not found');
  }
};

export const getWaterTestByIdService = async (id: string): Promise<IWaterQualityTest> => {
  const test = await WaterQualityTest.findById(id).populate('tester', 'name email');
  
  if (!test) {
    throw new Error('Water quality test not found');
  }
  
  return test;
};

// New analytics service
export const getWaterTestAnalyticsService = async (filters?: {
  location?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const matchStage: any = {};
  
  if (filters?.location) matchStage.location = { $regex: filters.location, $options: 'i' };
  if (filters?.startDate || filters?.endDate) {
    matchStage.testDate = {};
    if (filters.startDate) matchStage.testDate.$gte = new Date(filters.startDate);
    if (filters.endDate) matchStage.testDate.$lte = new Date(filters.endDate);
  }

  const analytics = await WaterQualityTest.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalTests: { $sum: 1 },
        safeTests: { $sum: { $cond: [{ $eq: ['$status', 'Safe'] }, 1, 0] } },
        unsafeTests: { $sum: { $cond: [{ $eq: ['$status', 'Unsafe'] }, 1, 0] } },
        avgPh: { $avg: '$pH' },
        avgTds: { $avg: '$tds' },
        avgTurbidity: { $avg: '$turbidity' },
        maxPh: { $max: '$pH' },
        minPh: { $min: '$pH' },
        maxTds: { $max: '$tds' },
        minTds: { $min: '$tds' }
      }
    }
  ]);

  return analytics[0] || {
    totalTests: 0,
    safeTests: 0,
    unsafeTests: 0,
    avgPh: 0,
    avgTds: 0,
    avgTurbidity: 0,
    maxPh: 0,
    minPh: 0,
    maxTds: 0,
    minTds: 0
  };
};