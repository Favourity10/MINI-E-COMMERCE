import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      unique: true,          // One cart per user
      required: true
    },

    items: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,             // Can't add zero or negative quantities
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

// Remove duplicate products by updating quantity if item already exists
cartSchema.methods.addItem = function (productId, qty = 1) {
  const itemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (itemIndex > -1) {
    // Update quantity
    this.items[itemIndex].quantity += qty;
  } else {
    // Add new product
    this.items.push({ product: productId, quantity: qty });
  }

  return this.save();
};

const cartModel= mongoose.model("Cart", cartSchema);
export default cartModel;
