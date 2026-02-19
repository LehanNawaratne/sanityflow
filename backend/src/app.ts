import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './utils/errorHandler.js';
import helmet from 'helmet';
import morganMiddleware from './config/morgan.js';
import Logger from './utils/logger.js';

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morganMiddleware);


//routes
app.use('/api/v1/auth', authRoutes);


app.use(errorHandler);

export default app;