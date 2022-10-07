import { User } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.password,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new AppError('Please provide email and password!', 400);
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return new AppError('Incorrect email or password', 401);
  }
};
