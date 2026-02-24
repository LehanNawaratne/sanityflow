import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import waterTestRoutes from './routes/waterTestRoutes.js';
import errorHandler from './utils/errorHandler.js';
import helmet from 'helmet';
import morgan from 'morgan'

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/issues', issueRoutes);
app.use('/api/v1/water-tests', waterTestRoutes);


app.use(errorHandler);

export default app;