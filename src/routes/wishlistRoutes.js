import express from "express";
import {
  createWishlist,
  deleteManyData,
  deleteWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/:userEmail", getUserWishlist);
router.post("/", createWishlist);
router.delete("/:wishlistId", deleteWishlist);
router.delete("/all/:userEmail", deleteManyData);

export default router;
