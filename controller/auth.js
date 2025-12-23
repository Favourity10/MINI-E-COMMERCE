import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../model/user.js'
import nodemailer from 'nodemailer';


// Register endpoint
const authController ={
    register : async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      address: address || {}
    });

    // Save user to database
    await newUser.save();

    // Return success response (exclude password)
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message
    });
  }
},

    login: async (req, res) => {
      try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Email and password are required"
          });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password"
          });
        }


        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password"
          });
        }
        // Generate JWT token
         const token = jwt.sign(
         { _id: user._id, email: user.email },
         process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );


        // Return success response (exclude password)
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
          success: true,
          message: "Login successful",
          user: userResponse,
           token
        });

      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
          success: false,
          message: "Server error during login",
          error: error.message
        });
      }
    },
    
    resetPassword: async (req, res) => {
      try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // Validation
        if (!newPassword || !confirmPassword) {
          return res.status(400).json({
            success: false,
            message: "New password and confirm password are required"
          });
        }

        if (newPassword !== confirmPassword) {
          return res.status(400).json({
            success: false,
            message: "Passwords do not match"
          });
        }

        if (newPassword.length < 6) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long"
          });
        }

        // Verify token
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired reset token"
          });
        }

        // Find user by ID
        const user = await userModel.findById(decoded._id);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
          success: true,
          message: "Password reset successfully"
        });

      } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
          success: false,
          message: "Server error during password reset",
          error: error.message
        });
      }
    },
     forgotPassword: async (req, res) => {
      try {
        const { email } = req.body;

        // Validation
        if (!email) {
          return res.status(400).json({
            success: false,
            message: "Email is required"
          });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
        }

        // Generate reset token
        const resetToken = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Create reset link
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Configure email transporter
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          // service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset Request',
          html: `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password. This link expires in 15 minutes.</p>
            <a href="${resetLink}">Reset Password</a>
            <p>If you didn't request this, please ignore this email.</p>
          `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({
          success: true,
          message: "Reset password link sent to your email"
        });

      } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
          success: false,
          message: "Server error during password reset request",
          error: error.message
        });
      }
    }

}



export default authController;
 