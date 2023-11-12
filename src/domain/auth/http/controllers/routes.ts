import { FastifyInstance } from "fastify";
import { register } from "./register";
import { confirm } from "./confirmUser";
import { login } from "./login";
import { refresh } from "./refresh";
import { registerDocs } from "../../docs/authDocs";
import { forgotPassword } from "./forgotPassword";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", registerDocs, register);
  app.post("/forgot-password", forgotPassword);
  app.post("/confirm", confirm);
  app.post("/login", login);
  app.patch("/token/refresh", refresh);
}
