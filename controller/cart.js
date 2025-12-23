import cartModel from '../model/cart.js';
import productModel from '../model/product.js';

const cartController = {
  // Add product to cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id; // assuming auth middleware populates req.user

      // Validation
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Product ID and quantity are required"
        });
      }

      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be greater than 0"
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

      // Check stock
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock available"
        });
      }

      // Find or create cart
      let cart = await cartModel.findOne({ user: userId });

      if (!cart) {
        cart = new cartModel({
          user: userId,
          items: []
        });
      }

      // Check if product already in cart
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          product: productId,
          quantity
        });
      }

      await cart.save();

      res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart
      });

    } catch (error) {
      console.error("Add to cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while adding to cart",
        error: error.message
      });
    }
  },

   // Remove product from cart
  removeFromCart: async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      // Validation
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Find user's cart
      const cart = await cartModel.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found"
        });
      }

      // Check if product exists in cart
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Product not found in cart"
        });
      }

      // Remove product from cart
      cart.items.splice(itemIndex, 1);

      // Save cart
      await cart.save();

      res.status(200).json({
        success: true,
        message: "Product removed from cart successfully",
        cart: cart
      });

    } catch (error) {
      console.error("Remove from cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while removing from cart",
        error: error.message
      });
    }
  },
   // Update product quantity in cart
  updateCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id;

      // Validation
      if (!productId || quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: "Product ID and quantity are required"
        });
      }

      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be greater than 0"
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

      // Check if product has enough stock
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock available"
        });
      }

      // Find user's cart
      const cart = await cartModel.findOne({ userId });

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found"
        });
      }

      // Find product in cart
      const cartItem = cart.items.find(item => item.productId.toString() === productId);

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: "Product not found in cart"
        });
      }

      // Update quantity
      cartItem.quantity = quantity;

      // Save cart
      await cart.save();

      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: cart
      });

    } catch (error) {
      console.error("Update cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating cart",
        error: error.message
      });
    }
  },
   // Get user's cart
  getCart: async (req, res) => {
    try {
      const userId = req.user._id;

      // Find user's cart
      const cart = await cartModel.findOne({ userId }).populate('items.productId');

      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Cart not found"
        });
      }

      // Calculate total price
      let totalPrice = 0;
      cart.items.forEach(item => {
        totalPrice += item.productId.price * item.quantity;
      });

      res.status(200).json({
        success: true,
        message: "Cart retrieved successfully",
        cart: cart,
        totalPrice: totalPrice,
        itemCount: cart.items.length
      });

    } catch (error) {
      console.error("Get cart error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while retrieving cart",
        error: error.message
      });
    }
  }

};

export default cartController;