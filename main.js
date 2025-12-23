import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
await mongoose.connect(process.env.MONGODB_URI);

// Import routes
import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import reviewRouter from "./routes/review.js";

// API Routes
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/reviews', reviewRouter);

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});