import express from 'express';
import authController from '../controller/auth.js';
const authRouter = express.Router();
import authMiddleware from '../middleware/auth.js';


authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/reset-password/:token', authController.resetPassword);
authRouter.post('/forgot-password', authController.forgotPassword);



export default authRouter;