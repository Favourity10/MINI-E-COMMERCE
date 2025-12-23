import express from 'express';
import categoryController from '../controller/category.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/role.js';

const categoryRouter = express.Router();

categoryRouter.post('/categories', authMiddleware, isAdmin, categoryController.createCategory);
categoryRouter.put('/categories/:id', authMiddleware, isAdmin, categoryController.updateCategory);
categoryRouter.get('/categories', categoryController.getAllCategories);
categoryRouter.get('/categories/:slug', categoryController.getCategoryBySlug);
categoryRouter.delete('/categories/:id', authMiddleware, isAdmin, categoryController.deleteCategory);

export default categoryRouter;