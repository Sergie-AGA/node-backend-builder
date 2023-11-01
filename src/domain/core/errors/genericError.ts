import { FastifyReply } from "fastify";

export function genericError(err: unknown, res: FastifyReply) {
  if (err instanceof Error) {
    return res
      .status(500)
      .send({ error: err.message || "Internal Server Error" });
  }
  return res.status(500).send({ error: "Internal Server Error" });
}
