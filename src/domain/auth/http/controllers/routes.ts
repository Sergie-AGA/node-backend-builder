import { FastifyInstance } from "fastify";
import { register } from "./register";
import { confirm } from "./confirmUser";
import { login } from "./login";
import { refresh } from "./refresh";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/confirm", confirm);
  app.post("/login", login);
  app.patch("/token/refresh", refresh);
}
