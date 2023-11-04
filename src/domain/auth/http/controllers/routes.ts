import { FastifyInstance } from "fastify";
import { register } from "./register";
import { confirm } from "./confirmUser";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/confirm", confirm);
}
