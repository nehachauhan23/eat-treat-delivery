import { Router } from "express";

import { orderService } from "../services/order.service.js";
import { createOrderSchema } from "../validators/order.validators.js";

const router = Router();

router.post("/", (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid request",
      errors: parsed.error.flatten(),
    });
  }

  const order = orderService.createOrder(parsed.data);

  return res.status(201).json(order);
});

router.get("/:id", (req, res) => {
  const order = orderService.getOrder(req.params.id);
    console.log("order id : ", req.params.id );
    
  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  return res.json(order);
});

export default router;
