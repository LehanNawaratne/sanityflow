export interface JWTPayload {
  userId: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

import { z } from 'zod';

export const createWaterQualityTestSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  date: z.string().transform((str) => new Date(str)),
  pH: z.number().min(0, 'pH must be at least 0').max(14, 'pH must be at most 14'),
  TDS: z.number().min(0, 'TDS must be non-negative'),
  contaminants: z.array(z.string()),
  tester: z.string().min(1, 'Tester is required')
});

export const updateWaterQualityTestSchema = createWaterQualityTestSchema.partial();

export {};
