import { z } from 'zod';

export const createDriverSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  contact: z.string().min(1, 'Contact is required'),
  vehicleInfo: z.string().min(1, 'Vehicle info is required'),
  assignedArea: z.string().min(1, 'Assigned area is required'),
  availability: z.enum(['Active', 'Inactive']),
});

export const updateDriverSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.email('Invalid email address').optional(),
  contact: z.string().min(1, 'Contact is required').optional(),
  vehicleInfo: z.string().min(1, 'Vehicle info is required').optional(),
  assignedArea: z.string().min(1, 'Assigned area is required').optional(),
  availability: z.enum(['Active', 'Inactive']).optional(),
});

export const availabilitySchema = z.object({
  availability: z.enum(['Active', 'Inactive']),
});
