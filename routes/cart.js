import express from 'express';
import cartController from '../controller/cart.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, cartController.addToCart);
cartRouter.post('/remove', authMiddleware, cartController.removeFromCart);
cartRouter.put('/update', authMiddleware, cartController.updateCart);

export default cartRouter;
