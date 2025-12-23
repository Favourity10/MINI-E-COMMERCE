import categoryModel from '../model/category.js';

const categoryController = {
  // Create category (admin only)
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;

      // Validation
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required"
        });
      }

      // Check if category already exists
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category already exists"
        });
      }

      // Create new category
      const newCategory = new categoryModel({
        name,
        description: description || ""
      });

      // Save category to database
      await newCategory.save();

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category: newCategory
      });

    } catch (error) {
      console.error("Category creation error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during category creation",
        error: error.message
      });
    }
  },

  // Update category (admin only)
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Category ID is required"
        });
      }

      // Check if category name already exists (if updating name)
      if (name) {
        const existingCategory = await categoryModel.findOne({ 
          name, 
          _id: { $ne: id } 
        });
        if (existingCategory) {
          return res.status(409).json({
            success: false,
            message: "Category name already exists"
          });
        }
      }

      // Find and update category
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(description && { description })
        },
        { new: true, runValidators: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory
      });

    } catch (error) {
      console.error("Category update error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during category update",
        error: error.message
      });
    }
  },

  // Get all categories (public)
  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryModel.find();

      if (!categories || categories.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No categories found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        count: categories.length,
        categories: categories
      });

    } catch (error) {
      console.error("Get categories error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching categories",
        error: error.message
      });
    }
  },

  //Get category by slug (public)
  getCategoryBySlug: async (req, res) => {
    try {
      const { slug } = req.params;

      // Validation
      if (!slug) {
        return res.status(400).json({
          success: false,
          message: "Category slug is required"
        });
      }

      // Find category by slug
      const category = await categoryModel.findOne({ slug });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Category retrieved successfully",
        category: category
      });

    } catch (error) {
      console.error("Get category by slug error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching category",
        error: error.message
      });
    }
  },

  // Delete category (admin only)
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;

      // Validation
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Category ID is required"
        });
      }

      // Find and delete category
      const deletedCategory = await categoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        category: deletedCategory
      });

    } catch (error) {
      console.error("Category delete error:", error);
      res.status(500).json({
        success: false,
        message: "Server error during category deletion",
        error: error.message
      });
    }
  }

  
};

export default categoryController;