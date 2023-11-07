import { FastifyInstance } from "fastify";
import { register } from "./register";
import { confirm } from "./confirmUser";
import { login } from "./login";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/confirm", confirm);
  app.post("/login", login);
}
