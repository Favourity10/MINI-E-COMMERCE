import express from 'express';
import reviewController from '../controller/review.js';
import authMiddleware from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/', authMiddleware, reviewController.createReview);
reviewRouter.get('/productId', reviewController.getProductReviews);

export default reviewRouter;