import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/menu", menuRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});
app.use("/api/orders", orderRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
