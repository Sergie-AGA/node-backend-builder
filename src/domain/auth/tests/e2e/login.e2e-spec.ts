import { expect, describe, it, beforeEach } from "vitest";
import { app } from "@/app";
import request from "supertest";
import { mockUser } from "../mocks/mockUser";

describe("Login (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => await app.close());

  it("should be able to log in", async () => {
    await request(app.server).post("/auth/register").send(mockUser);

    const response = await request(app.server)
      .post("/auth/login")
      .send(mockUser);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
