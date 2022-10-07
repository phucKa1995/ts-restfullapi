import { globalError } from './controllers/errorController';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import { router as tourRoutes } from './routes/tourRoutes';
import { router as userRoutes } from './routes/userRoutes';
import { AppError } from './utils/appError';
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

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);

export default app;
