import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Register (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => await app.close());

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      username: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
