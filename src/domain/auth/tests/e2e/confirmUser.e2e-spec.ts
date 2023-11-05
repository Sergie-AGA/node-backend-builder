import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mockUser } from "../mocks/mockUser";

describe("Confirm user (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => await app.close());

  it("should be able to confirm a registered user", async () => {
    const response = await request(app.server)
      .post("/auth/register")
      .send(mockUser);

    const confirmation = await request(app.server)
      .post("/auth/confirm")
      .send({ id: response.body.attributes.id });

    expect(confirmation.statusCode).toEqual(200);
  });
});
