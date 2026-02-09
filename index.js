import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";
import addToCartRoutes from "./src/routes/addToCartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://biz-cart-client.vercel.app",

    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/addToCarts", addToCartRoutes);
app.use("/api/orders", orderRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
