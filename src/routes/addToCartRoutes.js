import express from "express";
import {
  createAddToCart,
  decrementCartItem,
  deleteAddToCart,
  getAllAddToCart,
  incrementCartItem,
} from "../controllers/addToCartController.js";

const router = express.Router();

router.get("/:userEmail", getAllAddToCart);
router.post("/", createAddToCart);
router.delete("/:id", deleteAddToCart);
router.patch("/:id/increment", incrementCartItem);
router.patch("/:id/decrement", decrementCartItem);
export default router;
