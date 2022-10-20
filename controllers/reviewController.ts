import { Review } from '../models/reviewModel';
import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handleFactory';
import express, { Request, Response, NextFunction } from 'express';

export const setTourUserIds = (req: any, res: Response, next: NextFunction) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = getAll(Review);
export const getReview = getOne(Review);
export const createReview = createOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);
