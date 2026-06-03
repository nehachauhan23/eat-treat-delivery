import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../app.js";

describe("Menu API", () => {
  it("should return menu items", async () => {
    const response = await request(app)
      .get("/api/menu");

    expect(response.status).toBe(200);

    expect(
      response.body.length
    ).toBeGreaterThan(0);
  });
});