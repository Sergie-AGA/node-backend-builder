import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, res: FastifyReply) {
  // Sanitise data
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
}
