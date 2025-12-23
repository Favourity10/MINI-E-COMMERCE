# Mini Ecommerce Backend API

A robust and scalable REST API for an e-commerce platform built with Node.js, Express, and MongoDB. This backend provides complete functionality for product management, user authentication, shopping cart, orders, and product reviews.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- ✅ User registration with validation
- ✅ Secure login with JWT authentication
- ✅ Password reset via email
- ✅ Role-based access control (User/Admin)
- ✅ User profile management

### Product Management
- ✅ CRUD operations for products
- ✅ Product categorization
- ✅ Stock management
- ✅ Product search and filtering
- ✅ Product images support

### Shopping Cart
- ✅ Add/remove products from cart
- ✅ Update product quantities
- ✅ Real-time cart updates
- ✅ Persistent cart storage

### Orders
- ✅ Order creation and management
- ✅ Order status tracking (processing, shipped, delivered, cancelled)
- ✅ Payment method selection
- ✅ Shipping address management
- ✅ Order history for users

### Reviews & Ratings
- ✅ Product reviews with ratings (1-5 stars)
- ✅ User reviews management
- ✅ Average rating calculation
- ✅ Review filtering by product

### Admin Features
- ✅ Admin-only product creation/management
- ✅ Order management and status updates
- ✅ Category management
- ✅ View all orders and users

### Security & Performance
- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Input validation and sanitization
- ✅ Environment variable management
- ✅ Error handling and logging
- ✅ Email notifications (Nodemailer)

## 🛠 Tech Stack

### Runtime & Framework
- **Node.js** v14+ - JavaScript runtime
- **Express.js** - Web application framework

### Database
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM)

### Authentication & Security
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and verification
- **CORS** - Cross-origin resource sharing

### Email Service
- **Nodemailer** - Email sending for password reset

### Utilities
- **dotenv** - Environment variable management
- **Axios** - HTTP client

## 📁 Project Structure

```
Mini-Ecommerce/
│
├── controller/                          # Business Logic Layer
│   ├── auth.js                         # Authentication logic
│   ├── product.js                      # Product CRUD operations
│   ├── category.js                     # Category management
│   ├── cart.js                         # Shopping cart logic
│   ├── order.js                        # Order processing
│   └── review.js                       # Product reviews
│
├── routes/                              # API Route Definitions
│   ├── auth.js                         # Authentication endpoints
│   ├── product.js                      # Product endpoints
│   ├── category.js                     # Category endpoints
│   ├── cart.js                         # Cart endpoints
│   ├── order.js                        # Order endpoints
│   └── review.js                       # Review endpoints
│
├── middleware/                          # Custom Middleware
│   ├── auth.js                         # JWT verification middleware
│   └── role.js                         # Role-based authorization
│
├── model/                               # Database Schemas
│   ├── user.js                         # User schema
│   ├── product.js                      # Product schema
│   ├── category.js                     # Category schema
│   ├── cart.js                         # Cart schema
│   ├── order.js                        # Order schema
│   └── review.js                       # Review schema
│
├── main.js                              # Express app configuration
├── package.json                         # Project dependencies
├── .env                                 # Environment variables (not in repo)
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org)
  - Verify: `node --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **MongoDB** (Local or Cloud)
  - Local: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

- **Git** (Optional, for version control)
  - Download from [git-scm.com](https://git-scm.com)

- **Postman** (Optional, for API testing)
  - Download from [postman.com](https://www.postman.com/downloads)

## 🚀 Installation

### Step 1: Clone or Navigate to Project

```bash
# If cloning from GitHub
git clone https://github.com/yourusername/Mini-Ecommerce.git
cd Mini-Ecommerce

# Or navigate to existing project
cd Mini-Ecommerce
```

### Step 2: Install Dependencies

```bash
# Install all dependencies from package.json
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin requests
- `nodemailer` - Email service
- `axios` - HTTP client

### Step 3: Verify Installation

```bash
# Check installed packages
npm list

# Should show all packages installed successfully
```

## ⚙️ Configuration

### Step 1: Create .env File

Create a `.env` file in the root directory (same level as `main.js`):

```bash
# Windows Command Prompt
echo. > .env

# Or create manually in your editor
```

### Step 2: Add Environment Variables

Copy and paste the following into your `.env` file:

```env
# ==================== DATABASE ====================
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/mini-ecommerce

# For MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority

# ==================== JWT CONFIGURATION ====================
JWT_SECRET=your_super_secret_jwt_key_here_min_32_characters_recommended

# ==================== EMAIL CONFIGURATION ====================
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# ==================== APPLICATION ====================
CLIENT_URL=http://localhost:3000
PORT=4000
NODE_ENV=development
```

### Step 3: Setup MongoDB

#### Option A: Local MongoDB

```bash
# Windows
# Download and install MongoDB Community Edition
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

# Start MongoDB service
mongod

# In another terminal, start mongo shell (optional)
mongo
```

#### Option B: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (if you don't have one)
3. Create a new project
4. Create a cluster (free tier available)
5. Set up database access:
   - Create a database user
   - Set a strong password
6. Get connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
7. Update `.env`:

```env
MONGODB_URI=mongodb+srv://myusername:mypassword@cluster0.xxxxx.mongodb.net/mini-ecommerce?retryWrites=true&w=majority
```

8. Replace:
   - `myusername` - Your database user
   - `mypassword` - Your database password
   - Keep everything else the same

### Step 4: Setup Gmail for Password Reset

#### Enable 2-Factor Authentication

1. Go to [Google Account](https://myaccount.google.com)
2. Click "Security" in the left menu
3. Scroll to "2-Step Verification"
4. Click "Get Started"
5. Follow the prompts to enable 2FA

#### Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click "App passwords"
3. If not visible, enable 2FA first (see above)
4. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your OS)
5. Google will generate a 16-character password
6. Copy this password
7. Update `.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Step 5: Generate JWT Secret

Generate a strong secret key for JWT:

```bash
# Windows PowerShell
$secret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).Guid + (New-Guid).Guid))
$secret

# Copy the output and paste in .env as JWT_SECRET
```

Or use an online generator: [Random.org](https://www.random.org/strings/)

Minimum 32 characters recommended:

```env
JWT_SECRET=a_very_long_and_random_string_of_at_least_32_characters_1234567890
```

### Step 6: Verify Configuration

Check that your `.env` file has all required variables:

```env
✅ MONGODB_URI=...
✅ JWT_SECRET=...
✅ EMAIL_USER=...
✅ EMAIL_PASSWORD=...
✅ CLIENT_URL=http://localhost:3000
✅ PORT=4000
✅ NODE_ENV=development
```

## 🎯 Running the Server

### Start the Development Server

```bash
# From the project root directory
npm start
```

### Expected Output

```
Backend app listening on port 4000
```

### Verify Server is Running

Open your browser and visit:
```
http://localhost:4000
```

You should see a response (usually an error page, which is normal).

### Stop the Server

```bash
# Press Ctrl + C in the terminal
Ctrl + C
```

### Troubleshooting Startup Issues

#### Port 4000 Already in Use

```bash
# Find what's using port 4000 (Windows)
netstat -ano | findstr :4000

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

#### MongoDB Connection Failed

```bash
# Make sure MongoDB is running
# For local MongoDB, run in another terminal:
mongod

# For Atlas, verify:
# ✅ Connection string is correct
# ✅ Username and password are correct
# ✅ IP address is whitelisted
# ✅ Cluster is running
```

#### Module Not Found

```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

## 📚 API Documentation

### Base URL

```
http://localhost:4000
```

### Authentication Header

All protected routes require this header:

```
Authorization: Bearer {token}
```

### Response Format

All responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {...},
  "error": "Error details (if any)"
}
```

## 🔐 Authentication Routes

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "address": "123 Main St, City, State 12345"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Store this token in localStorage or sessionStorage**

### Forgot Password

```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reset password link sent to your email"
}
```

### Reset Password

```http
POST /auth/reset-password/:token
Content-Type: application/json

{
  "newPassword": "newSecurePassword456",
  "confirmPassword": "newSecurePassword456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

## 📦 Product Routes

### Get All Products

```http
GET /products
```

**Query Parameters (Optional):**
```
?category=Electronics
?search=laptop
?limit=10&skip=0
```

**Response (200):**
```json
{
  "success": true,
  "count": 25,
  "products": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "stock": 50,
      "description": "High-performance laptop",
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

### Get Single Product

```http
GET /products/:id
```

**Response (200):**
```json
{
  "success": true,
  "product": {...}
}
```

### Create Product (Admin Only)

```http
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "categoryId",
  "stock": 100,
  "image": "https://example.com/image.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {...}
}
```

### Update Product (Admin Only)

```http
PUT /products/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Product",
  "price": 89.99,
  "stock": 75
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

### Delete Product (Admin Only)

```http
DELETE /products/:id
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## 🛒 Cart Routes

### Add to Cart

```http
POST /cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "60d5ec49c1234567890abcde",
  "quantity": 2
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product added to cart"
}
```

### Get Cart

```http
GET /cart
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "cart": {
    "_id": "...",
    "items": [
      {
        "productId": {...},
        "quantity": 2
      }
    ]
  }
}
```

### Update Cart Item

```http
PUT /cart/update
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "60d5ec49c1234567890abcde",
  "quantity": 3
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Cart updated successfully"
}
```

### Remove from Cart

```http
POST /cart/remove
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "60d5ec49c1234567890abcde"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product removed from cart"
}
```

## 📋 Order Routes

### Create Order

```http
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Payment Methods:**
- `credit_card`
- `debit_card`
- `paypal`
- `bank_transfer`

**Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "...",
    "totalAmount": 299.97,
    "orderStatus": "processing",
    "paymentStatus": "pending"
  }
}
```

### Get My Orders

```http
GET /orders/my
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "orders": [...]
}
```

### Get All Orders (Admin Only)

```http
GET /orders
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "count": 50,
  "orders": [...]
}
```

### Update Order Status (Admin Only)

```http
PUT /orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderStatus": "shipped",
  "paymentStatus": "paid"
}
```

**Order Status Options:**
- `processing` - Initial state
- `shipped` - Order has been shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

**Payment Status Options:**
- `pending` - Awaiting payment
- `paid` - Payment received
- `failed` - Payment failed

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

## ⭐ Review Routes

### Create Review

```http
POST /reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "60d5ec49c1234567890abcde",
  "rating": 5,
  "comment": "Great product! Highly recommended."
}
```

**Rating:** 1-5 (integers only)

**Response (201):**
```json
{
  "success": true,
  "message": "Review created successfully"
}
```

### Get Product Reviews

```http
GET /reviews/:productId
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "averageRating": 4.5,
  "reviews": [
    {
      "_id": "...",
      "user": {
        "name": "John Doe"
      },
      "rating": 5,
      "comment": "Great product!",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## 🗂️ Database Models

### User Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcrypt),
  address: String,
  role: String (enum: ["user", "admin"], default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema

```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  price: Number (required),
  category: ObjectId (ref: Category),
  stock: Number (required, default: 0),
  image: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema

```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Schema

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, unique),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: Number (required, min: 1)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  items: [
    {
      productId: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number (required),
  paymentMethod: String (enum: ["credit_card", "debit_card", "paypal", "bank_transfer"]),
  paymentStatus: String (enum: ["pending", "paid", "failed"], default: "pending"),
  orderStatus: String (enum: ["processing", "shipped", "delivered", "cancelled"], default: "processing"),
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User, required),
  product: ObjectId (ref: Product, required),
  rating: Number (required, min: 1, max: 5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## ⚠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "message": "User-friendly error message",
  "error": "Detailed error information"
}
```

### HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or missing required fields |
| 401 | Unauthorized | Missing or invalid authentication token |
| 403 | Forbidden | Authenticated but lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists (duplicate) |
| 500 | Server Error | Unexpected server error |

### Common Error Scenarios

**Missing Required Field:**
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

**Invalid Token:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Insufficient Permissions:**
```json
{
  "success": false,
  "message": "Only admins can perform this action"
}
```

**Resource Not Found:**
```json
{
  "success": false,
  "message": "Product not found"
}
```

**Duplicate Email:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## ✅ Best Practices

### Security
- 🔒 Always hash passwords with bcryptjs
- 🔒 Use environment variables for secrets
- 🔒 Validate all user inputs
- 🔒 Implement rate limiting in production
- 🔒 Use HTTPS in production
- 🔒 Keep sensitive data out of logs

### Code Quality
- 📝 Write descriptive error messages
- 📝 Use consistent naming conventions
- 📝 Add comments for complex logic
- 📝 Validate input data thoroughly
- 📝 Handle all promise rejections
- 📝 Log important operations

### Database
- 💾 Index frequently queried fields
- 💾 Use transactions for multi-step operations
- 💾 Backup database regularly
- 💾 Monitor database performance
- 💾 Use connection pooling

### API Design
- 🔗 Follow REST conventions
- 🔗 Use appropriate HTTP methods
- 🔗 Implement pagination for large datasets
- 🔗 Version your API
- 🔗 Document all endpoints

## 🐛 Troubleshooting

### Server Won't Start

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:** MongoDB is not running
```bash
# Start MongoDB
mongod

# Or check MongoDB Atlas connection string
```

**Error:** `Error: Cannot find module 'express'`

**Solution:** Dependencies not installed
```bash
npm install
```

### Authentication Issues

**Error:** `Invalid or expired token`

**Solution:**
- Check token is included in headers
- Verify token hasn't expired (7 days)
- Check JWT_SECRET matches

**Error:** `Only admins can perform this action`

**Solution:**
- User must have `role: "admin"`
- Contact database admin to update user role

### Database Issues

**Error:** `MongoNetworkError`

**Solution:**
- Check MongoDB is running
- Verify connection string
- Check network connectivity
- Whitelist IP in MongoDB Atlas

### Email Not Sending

**Error:** `Error: Invalid login: 535-5.7.8 Username and password not accepted`

**Solution:**
- Use App Password, not Gmail password
- Enable 2FA on Google Account
- Verify EMAIL_USER and EMAIL_PASSWORD

## 📝 Testing with Postman

### Setup Postman Environment

1. Create new collection: "Mini Ecommerce"
2. Create environment with variables:

```json
{
  "baseUrl": "http://localhost:4000",
  "token": "your_jwt_token_here",
  "productId": "product_id_here",
  "userId": "user_id_here"
}
```

### Sample Testing Workflow

1. **Register User**
   ```
   POST {{baseUrl}}/auth/register
   ```

2. **Login User**
   ```
   POST {{baseUrl}}/auth/login
   ```
   - Save token in environment variable

3. **Create Product** (Admin)
   ```
   POST {{baseUrl}}/products
   Authorization: Bearer {{token}}
   ```

4. **Add to Cart**
   ```
   POST {{baseUrl}}/cart/add
   Authorization: Bearer {{token}}
   ```

5. **Create Order**
   ```
   POST {{baseUrl}}/orders
   Authorization: Bearer {{token}}
   ```

6. **Get Orders**
   ```
   GET {{baseUrl}}/orders/my
   Authorization: Bearer {{token}}
   ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Contact: support@miniecommerce.com
- Email: info@miniecommerce.com

---

## 📅 Version History

**v1.0.0** (Current)
- Initial release
- Complete REST API
- User authentication
- Product management
- Shopping cart
- Order management
- Reviews system

---

**Made with ❤️ for the community**

**Happy Coding! 🚀**