import { Router } from "express";
import { menuItems } from "../data/menu.js"

const router = Router();

router.get("/", (_, res) => {
  res.json(menuItems);
});

export default router;