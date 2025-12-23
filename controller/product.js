import productModel from '../model/product.js';

const productController = {
  // Create product (admin only)
  createProduct: async (req, res) => {
    try {
      const { name, description, price, categoryId, stock, image } = req.body;

      // Validation
      if (!name || !price || !categoryId) {
        return res.status(400).json({
          success: false,
          message: "Name, price, and categoryId are required"
        });
      }

      if (price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be positive"
        });
      }

      // Create new product
      const newProduct = new productModel({
        name,
        description: description || "",
        price,
        category: categoryId,
        stock: stock || 0,
        image: image || null
      });

      // console.log("BODY:", req.body);

      // Save product to database
      await newProduct.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct
      });

    } catch (error) {
      console.error("Product creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during product creation",
        error: error.message
      });
    }
  },
  // Update product (admin only)
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock, image } = req.body;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      if (price !== undefined && price < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be positive"
        });
      }

      // Find and update product
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(description && { description }),
          ...(price !== undefined && { price }),
          ...(category && { category }),
          ...(stock !== undefined && { stock }),
          ...(image && { image })
        },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct
      });

    } catch (error) {
      console.error("Product update error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during product update",
        error: error.message
      });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.find();

      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        count: products.length,
        products: products
      });

    } catch (error) {
      console.error("Get products error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching products",
        error: error.message
      });
    }
  },
  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Find product by ID
      const product = await productModel.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        product: product
      });

    } catch (error) {
      console.error("Get product by ID error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching product",
        error: error.message
      });
    }
  },
   // Delete product (admin only)
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required"
        });
      }

      // Find and delete product
      const deletedProduct = await productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        product: deletedProduct
      });

    } catch (error) {
      console.error("Product delete error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during product deletion",
        error: error.message
      });
    }
  }
};

export default productController;