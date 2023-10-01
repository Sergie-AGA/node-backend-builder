// This file implements the factory pattern
import { PrismaUsersRepository } from "@/domain/auth/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../use-cases/register";

export function makeRegisterUseCase() {
  // Define database/model to use
  const usersRepository = new PrismaUsersRepository();
  // Run execution
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
