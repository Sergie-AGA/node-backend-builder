import fastify from "fastify";
import cookie from "@fastify/cookie";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { routes } from "./routes";

export const app = fastify();

app.register(cookie);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

// Routes
routes.forEach((route) => {
  app.register(route.handler, { prefix: route.prefix });
});

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Validation error.", issues: err.format() });
  }

  if (env.DATABASE_URL !== "production") {
    console.error(err);
  } else {
    // Ideally this is where we would log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: "Internal server error." });
});
