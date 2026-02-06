import express from "express";
import {
  createOrder,
  orderDelete,
  updatePayOrder,
  userAllOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/user/:userEmail", userAllOrder);
router.post("/", createOrder);
router.put("/", updatePayOrder);
router.delete("/:orderId", orderDelete);

export default router;
