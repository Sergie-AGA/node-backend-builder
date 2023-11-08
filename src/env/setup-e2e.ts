import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
// import { DomainEvents } from "@/domain/core/events/domain-events";
// import { Redis } from 'ioredis'
import { envSchema } from "./envSchema";
import { testPrisma } from "@/lib/prisma";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

const env = envSchema.parse(process.env);

// const redis = new Redis({
//   host: env.REDIS_HOST,
//   port: env.REDIS_PORT,
//   db: env.REDIS_DB,
// })

config({ path: ".env.test", override: true });

let prisma: PrismaClient;

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable");
  }

  const url = new URL(env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);

  process.env.DATABASE_URL = databaseURL;

  // DomainEvents.shouldRun = false;

  // await redis.flushdb()

  prisma = testPrisma();

  execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
