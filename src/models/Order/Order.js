import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        // image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    paymentMethod: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
