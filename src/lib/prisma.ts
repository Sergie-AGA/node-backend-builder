import { PrismaClient } from "@prisma/client";
import { env } from "@/env";

export let prisma = new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query"] : [],
});

export function testPrisma() {
  return (prisma = new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query"] : [],
  }));
}
