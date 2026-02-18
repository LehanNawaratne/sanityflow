import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './utils/errorHandler.js';
import helmet from 'helmet';
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet);
app.use(morgan("dev"));


//routes
app.use('/api/v1/auth', authRoutes);


app.use(errorHandler);

export default app;