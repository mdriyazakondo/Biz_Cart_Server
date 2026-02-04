import express from "express";
import {
  createWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/:userEmail", getUserWishlist);
router.post("/", createWishlist);
router.delete("/:wishlistId", deleteWishlist);

export default router;
