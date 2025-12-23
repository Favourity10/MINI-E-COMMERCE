import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },

    product: {
      type: ObjectId,
      ref: "Product",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

// Prevent a user from reviewing the same product twice
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const reviewModel  = mongoose.model("Review", reviewSchema);


export default reviewModel;
