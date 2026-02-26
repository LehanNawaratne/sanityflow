import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import waterTestRoutes from './routes/waterTestRoutes.js';
import distributionOrderRoutes from './routes/distributionOrderRoutes.js';
import beneficiaryRoutes from './routes/beneficiaryRoutes.js';
import blogRoutes from './routes/blog.routes.js';
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
app.use('/api/v1/issues', issueRoutes);
app.use('/api/v1/water-tests', waterTestRoutes);
app.use('/api/v1/distributions', distributionOrderRoutes);
app.use('/api/v1/beneficiaries', beneficiaryRoutes);
app.use('/api/v1/blog', blogRoutes);


app.use(errorHandler);

export default app;