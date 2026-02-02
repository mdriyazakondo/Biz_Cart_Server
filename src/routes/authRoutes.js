import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  loginUser,
  logoutUser,
  protect,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users-role/:email", protect, getUserByEmail);

router.get("/all-users", protect, getAllUsers);
export default router;
