import { globalError } from './controllers/errorController';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import { router as tourRoutes } from './routes/tourRoutes';
import { router as userRoutes } from './routes/userRoutes';
import { AppError } from './utils/appError';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
const dirPath = path.join(__dirname, '/public');
const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

app.use(express.static(dirPath));

// 3) ROUTES
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});
app.use(globalError);

export default app;
