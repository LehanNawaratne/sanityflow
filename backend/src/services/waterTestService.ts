import WaterQualityTest from '../models/WaterQualityTest.js';
import type { IWaterQualityTest } from '../models/WaterQualityTest.js';

// Business logic for water quality test operations
export const createWaterTestService = async (
  data: { 
    location: string; 
    pH: number; 
    tds: number; 
    contaminants: string[]; 
    status: 'Safe' | 'Unsafe'; 
    notes?: string | undefined
  }, 
  userId: string
): Promise<IWaterQualityTest> => {
  // Business rule: Automatically classify based on pH and TDS if status not explicitly unsafe
  let finalStatus = data.status;
  
  // WHO guidelines: pH should be 6.5-8.5, TDS should be < 500 for good quality
  if (data.pH < 6.5 || data.pH > 8.5 || data.tds > 500 || data.contaminants.length > 0) {
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

export const getAllWaterTestsService = async (): Promise<IWaterQualityTest[]> => {
  return await WaterQualityTest.find()
    .populate('tester', 'name email')
    .sort({ testDate: -1 });
};

export const updateWaterTestService = async (
  id: string, 
  data: { 
    pH?: number | undefined; 
    tds?: number | undefined; 
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