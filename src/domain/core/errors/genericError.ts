import { FastifyReply } from "fastify";
import { ValidationError } from "zod-validation-error";

export function genericError(err: unknown, res: FastifyReply) {
  if (err instanceof ValidationError) {
    return res.status(400).send({ error: err.message });
  }
  if (err instanceof Error) {
    return res
      .status(500)
      .send({ error: err.message || "Internal Server Error" });
  }
  return res.status(500).send({ error: "Internal Server Error" });
}
