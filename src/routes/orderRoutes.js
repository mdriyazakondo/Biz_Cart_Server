import express from "express";
import {
  createOrder,
  myProductOrder,
  orderDelete,
  updatePayOrder,
  userAllOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/user/:userEmail", userAllOrder);
router.get("/my-products-order/:sellerEmail", myProductOrder);
router.post("/", createOrder);
router.put("/:id", updatePayOrder);
router.delete("/:orderId", orderDelete);

export default router;
