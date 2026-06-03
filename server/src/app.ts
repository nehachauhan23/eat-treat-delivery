import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);