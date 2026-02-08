import express from "express";
import {
  bestProducts,
  CategoryProducts,
  createProduct,
  deleteProduct,
  featuredProducts,
  getProductById,
  getProducts,
  newProducts,
  trendingProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isSeller } from "../middleware/rolesMiddleware.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/newProducts", newProducts);
router.get("/bestProducts", bestProducts);
router.get("/category", CategoryProducts);
router.get("/trending", trendingProduct);
router.get("/featured", featuredProducts);
router.get("/:id", getProductById);
router.post("/new-product", protect, isSeller, createProduct);
router.put("/update-product/:productId", protect, isSeller, updateProduct);
router.delete("/delete-product/:productId", protect, isSeller, deleteProduct);

export default router;
