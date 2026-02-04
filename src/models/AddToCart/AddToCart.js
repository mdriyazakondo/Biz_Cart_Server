import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },

    productName: { type: String, required: true },
    description: { type: String },

    unitPrice: {
      type: Number,
      required: true, // 👈 single product price
    },

    price: {
      type: Number,
      required: true, // 👈 unitPrice * quantity
    },

    productImage: { type: String },
    brand: { type: String },
    category: { type: String, required: true },

    quantity: { type: Number, default: 1 },

    sku: { type: String },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("AddToCart", addToCartSchema);
