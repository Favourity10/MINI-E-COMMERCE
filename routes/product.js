import express from 'express';
import productController from '../controller/product.js';
import authMiddleware from '../middleware/auth.js';
import isAdmin from '../middleware/role.js';

const productRouter = express.Router();

productRouter.post('/create', authMiddleware,isAdmin, productController.createProduct);
productRouter.put('/update/:id', authMiddleware, productController.updateProduct);
productRouter.delete('/delete/:id', authMiddleware, productController.deleteProduct);
productRouter.get('/products', productController.getAllProducts);
productRouter.get('/products/:id', productController.getProductById);


export default productRouter;