import { FastifyInstance } from "fastify";
import { sendConfirmEmail } from "./send-confirm-email";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", sendConfirmEmail);
}
