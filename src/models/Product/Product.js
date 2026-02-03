import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    productImage: { type: String },
    brand: { type: String },
    category: { type: String, default: "Electronics" },
    quantity: { type: Number, default: 0 },
    sku: { type: String },
    status: { type: String, enum: ["Active", "Draft"], default: "Active" },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
