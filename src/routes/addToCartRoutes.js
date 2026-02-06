import express from "express";
import {
  addToCartCreateManyData,
  createAddToCart,
  decrementCartItem,
  deleteAddToCart,
  deleteManyDataAddToCart,
  getAllAddToCart,
  incrementCartItem,
} from "../controllers/addToCartController.js";

const router = express.Router();

router.get("/:userEmail", getAllAddToCart);
router.post("/", createAddToCart);
router.post("/many-data", addToCartCreateManyData);
router.patch("/:id/increment", incrementCartItem);
router.patch("/:id/decrement", decrementCartItem);
router.delete("/:id", deleteAddToCart);
router.delete("/all/:userEmail", deleteManyDataAddToCart);
export default router;
