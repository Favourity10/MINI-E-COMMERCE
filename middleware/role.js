import userModel from '../model/user.js';

const isAdmin = async (req, res, next) => {
  try {
    // Check if user exists in request (set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Find user by ID
    const user = await userModel.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found" 
      });
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required"
      });
    }

    next();

  } catch (error) {
    console.error("Role check error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during role verification",
      error: error.message
    });
  }
};

export default isAdmin;