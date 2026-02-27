import mongoose from 'mongoose';
import Logger from '../utils/logger.js';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    Logger.info('MongoDB connected');
  } catch (error) {
    Logger.error(`MongoDB connection error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

export default connectDB;
