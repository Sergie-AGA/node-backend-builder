import request from "supertest";
import { app } from "@/app";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mockUser } from "../mocks/mockUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Register (e2e)", async () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => await app.close());

  it("should be able to register", async () => {
    const response = await request(app.server)
      .post("/auth/register")
      .send(mockUser);

    expect(response.statusCode).toEqual(201);
  });
});
