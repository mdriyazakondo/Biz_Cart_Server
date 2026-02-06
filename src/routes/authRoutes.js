import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  loginUser,
  logoutUser,
  protect,
  registerUser,
  updateUser,
  updateUserRole,
} from "../controllers/authController.js";
import { isAdmin } from "../middleware/rolesMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/users-role",  getUserByEmail);
router.put("/update", protect, updateUser);
router.get("/all-users", protect, getAllUsers);
router.put("/update-role", protect, isAdmin, updateUserRole);
router.delete("/delete-user/:userId", protect, isAdmin, deleteUserById);

export default router;
