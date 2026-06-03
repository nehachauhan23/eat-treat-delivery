import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../app.js";

describe("Orders API", () => {
  //create order test
  it("should create an order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .send({
        customer: {
          name: "Neha",
          address: "Lucknow",
          phone: "9999999999",
        },
        items: [
          {
            menuItemId: "1",
            quantity: 2,
          },
        ],
      });

    expect(response.status).toBe(201);

    expect(response.body.id).toBeDefined();

    expect(response.body.status).toBe("ORDER_RECEIVED");
  });
  // reject invalid order test
  it("should reject invalid order", async () => {
    const response = await request(app).post("/api/orders").send({
      customer: {},
      items: [],
    });

    expect(response.status).toBe(400);
  });

  // get order test
  it("should return order by id", async () => {
    const created = await request(app)
      .post("/api/orders")
      .send({
        customer: {
          name: "Neha",
          address: "Lucknow",
          phone: "9999999999",
        },
        items: [
          {
            menuItemId: "1",
            quantity: 1,
          },
        ],
      });

    const response = await request(app).get(`/api/orders/${created.body.id}`);

    expect(response.status).toBe(200);

    expect(response.body.id).toBe(created.body.id);
  });
  // not found test
  it("should return 404 for missing order", async () => {
    const response = await request(app).get("/api/orders/does-not-exist");

    expect(response.status).toBe(404);
  });
});
