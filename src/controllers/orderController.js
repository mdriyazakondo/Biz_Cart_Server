import mongoose from "mongoose";
import Order from "../models/Order/Order.js";
import AddToCart from "../models/AddToCart/AddToCart.js";
import User from "../models/User/User.js";

export const createOrder = async (req, res, next) => {
  try {
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (!Array.isArray(data.products) || !data.products.length) {
      return res.status(400).json({ message: "Products required" });
    }

    // 🔥 prevent duplicate product order (same user)
    const productIds = data.products.map((p) => p.productId);

    const alreadyOrdered = await Order.findOne({
      userId: data.userId,
      "products.productId": { $in: productIds },
    });

    if (alreadyOrdered) {
      return res.status(400).json({
        message: "This product is already ordered by you",
      });
    }

    const newOrder = new Order(data);
    const savedOrder = await newOrder.save();

    await AddToCart.deleteMany({ userId: data.userId });

    res.status(201).json({
      success: true,
      message: "Order placed & cart cleared",
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const userAllOrder = async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await Order.find({ userId: user._id })
      .populate("products.productId", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("User order fetch error:", error.message);
    next(error);
  }
};

export const updatePayOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentStatus, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const validPaymentStatus = ["Paid", "Pending", "Failed"];
    const validStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (paymentStatus && !validPaymentStatus.includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    if (status && !validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    // 🔹 update
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        ...(paymentStatus && { paymentStatus }),
        ...(status && { status }),
      },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Order update error:", error.message);
    next(error);
  }
};

export const orderDelete = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Paid order cannot be deleted",
      });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
