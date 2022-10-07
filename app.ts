import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { router as tourRoutes } from './routes/tourRoutes';
import { router as userRoutes } from './routes/userRoutes';
const dirPath = path.join(__dirname, '/public');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(dirPath));

// 3) ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

export default app;
