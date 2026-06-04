import { v4 as uuid } from "uuid";

import { orders } from "../data/orders.js";
import { Order } from "../types/index.js";
import { CreateOrderDto } from "../validators/order.validators.js";
import { io } from "../socket.js";

export class OrderService {
  createOrder(payload: CreateOrderDto): Order {
    const order: Order = {
      id: uuid(),
      customer: payload.customer,
      items: payload.items,
      status: "ORDER_RECEIVED",
      createdAt: new Date(),
    };

    orders.push(order);

    this.simulateStatusUpdates(order.id);

    return order;
  }

  getOrder(id: string) {
    return orders.find((o) => o.id === id);
  }

  updateStatus(id: string, status: Order["status"]) {
    const order = this.getOrder(id);

    if (!order) return null;

    order.status = status;
    io.to(id).emit("statusUpdated", {
      status,
    });

    return order;
  }

  private simulateStatusUpdates(orderId: string) {
    setTimeout(() => {
      this.updateStatus(orderId, "PREPARING");
    }, 10000);

    setTimeout(() => {
      this.updateStatus(orderId, "OUT_FOR_DELIVERY");
    }, 20000);

    setTimeout(() => {
      this.updateStatus(orderId, "DELIVERED");
    }, 30000);
  }
}

export const orderService = new OrderService();
