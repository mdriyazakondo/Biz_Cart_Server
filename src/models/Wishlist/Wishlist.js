import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    productImage: { type: String },
    brand: { type: String },
    category: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    sku: { type: String },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Wishlist", wishlistSchema);
