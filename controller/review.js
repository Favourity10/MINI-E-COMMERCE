import reviewModel from '../model/review.js';
import productModel from '../model/product.js';
import orderModel from '../model/order.js';

const reviewController = {
  // Create review
  createReview: async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId, rating, comment } = req.body;

      // Validation
      if (!productId || !rating) {
        return res.status(400).json({
          success: false,
          message: "Product ID and rating are required"
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5"
        });
      }

      // Check if product exists
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      // Check if user has purchased this product
      const order = await orderModel.findOne({
        user: userId,
        'items.product': productId
      });

      if (!order) {
        return res.status(403).json({
          success: false,
          message: "You can only review products you have purchased"
        });
      }

      // Check if user already reviewed this product
      const existingReview = await reviewModel.findOne({
        user: userId,
        product: productId
      });

      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "You have already reviewed this product"
        });
      }

      // Create new review
      const newReview = new reviewModel({
        user: userId,
        product: productId,
        rating,
        comment: comment || ""
      });

      // Save review
      await newReview.save();

      res.status(201).json({
        success: true,
        message: "Review created successfully",
        review: newReview
      });

    } catch (error) {
      console.error("Create review error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while creating review",
        error: error.message
      });
    }
  },
  // Get reviews for a product
  getProductReviews: async (req, res) => {
    try {
      const { productId } = req.params;

      // Validation
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Check if product exists
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      // Find all reviews for the product
      const reviews = await reviewModel.find({ product: id })
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No reviews found for this product"
        });
      }

      // Calculate average rating
      const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);

      res.status(200).json({
        success: true,
        message: "Reviews retrieved successfully",
        count: reviews.length,
        averageRating: parseFloat(averageRating),
        reviews: reviews
      });

    } catch (error) {
      console.error("Get product reviews error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while retrieving reviews",
        error: error.message
      });
    }
  }
};

export default reviewController;