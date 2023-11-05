import { config } from "dotenv";
// import { z } from "zod";
import { envSchema } from "./envSchema";

config({ path: ".env", override: true });
if (process.env.NODE_ENV === "test") {
  config({ path: ".env.test", override: true });
}

// const envSchema = z.object({
//   NODE_ENV: z
//     .enum(["development", "test", "production"])
//     .default("development"),
//   JWT_SECRET: z.string(),
//   DATABASE_URL: z.string().default("../../db/app.db"),
//   PORT: z.coerce.number().default(3333),
// });

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables!", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
