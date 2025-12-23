import express from 'express';
import orderController from '../controller/order.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/role.js';

const orderRouter = express.Router();

orderRouter.post('/orders', authMiddleware, orderController.createOrder);
orderRouter.put('/:id/status', authMiddleware, isAdmin, orderController.updateOrderStatus);
orderRouter.get('/orders/my', authMiddleware, orderController.getUserOrders);
orderRouter.get('/orders', authMiddleware, isAdmin, orderController.getAllOrders);


export default orderRouter;