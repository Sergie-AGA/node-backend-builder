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
    const registeredUser = await request(app.server)
      .post("/auth/register")
      .send(mockUser);

    const resp1 = await request(app.server)
      .post("/auth/confirm")
      .send({ id: registeredUser.body.attributes.id });

    const response = await request(app.server)
      .post("/auth/login")
      .send(mockUser);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      attributes: {
        token: expect.any(String),
      },
    });
  });
});
