import { FastifySchema } from "fastify";

export const registerDocs = {
  schema: {
    tags: ["Auth"],
    body: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        description: "User Registered",
        properties: {
          attributes: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              email: { type: "string", format: "email" },
            },
          },
        },
      },
      409: {
        type: "null",
        description: "Validation error",
      },
      400: {
        type: "null",
        description: "User already registered",
      },
    },
  } as FastifySchema,
};
