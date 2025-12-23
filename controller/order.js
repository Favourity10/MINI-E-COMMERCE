import orderModel from '../model/order.js';
import cartModel from '../model/cart.js';
import productModel from '../model/product.js';

const orderController = {
  // Create order
  createOrder: async (req, res) => {
    try {
      const userId = req.user._id;
      const { shippingAddress, paymentMethod } = req.body;

      // Validation
      if (!shippingAddress || !paymentMethod) {
        return res.status(400).json({
          success: false,
          message: "Shipping address and payment method are required"
        });
      }

      // Find user's cart
      const cart = await cartModel.findOne({user: userId }).populate('items.product');

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty"
        });
      }

      // Calculate total and prepare order items
      let totalAmount = 0;
      const orderItems = [];

      for (let item of cart.items) {
        const product = item.product;
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
          subtotal: itemTotal
        });

        // Update product stock
        product.stock -= item.quantity;
        await product.save();
      }

      // Create new order
      const newOrder = new orderModel({
        user: userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        status: 'pending'
      });

      // Save order
      await newOrder.save();

      // Clear cart
      await cartModel.deleteOne({ userId });

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: newOrder
      });

    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while creating order",
        error: error.message
      });
    }
  },
  // Update order status (admin only)
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus, paymentStatus } = req.body;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required"
        });
      }

      if (!orderStatus && !paymentStatus) {
        return res.status(400).json({
          success: false,
          message: "Order status or payment status is required"
        });
      }

      // Valid status values
      const validOrderStatuses = ["processing", "shipped", "delivered", "cancelled"];
      const validPaymentStatuses = ["pending", "paid", "failed"];

      if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order status"
        });
      }

      if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid payment status"
        });
      }

      // Find and update order
      const updatedOrder = await orderModel.findByIdAndUpdate(
        id,
        {
          ...(orderStatus && { orderStatus }),
          ...(paymentStatus && { paymentStatus })
        },
        { new: true, runValidators: true }
      ).populate('user items.product');

      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order: updatedOrder
      });

    } catch (error) {
      console.error("Update order status error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating order status",
        error: error.message
      });
    }
  },
   // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const userId = req.user._id;

      // Find all orders for the user
      const orders = await orderModel.find({ user: userId })
        .populate('items.product')
        .sort({ createdAt: -1 });

      if (!orders || orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        count: orders.length,
        orders: orders
      });

    } catch (error) {
      console.error("Get user orders error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while retrieving orders",
        error: error.message
      });
    }
  },
    // Get all orders (admin only)
  getAllOrders: async (req, res) => {
    try {
      // Find all orders
      const orders = await orderModel.find()
        .populate('user', 'name email')
        .populate('items.product', 'name price image')
        .sort({ createdAt: -1 });

      if (!orders || orders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found"
        });
      }

      res.status(200).json({
        success: true,
        message: "All orders retrieved successfully",
        count: orders.length,
        orders: orders
      });

    } catch (error) {
      console.error("Get all orders error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while retrieving orders",
        error: error.message
      });
    }
  }
};

export default orderController;