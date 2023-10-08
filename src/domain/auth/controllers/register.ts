import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/domain/auth/errors/user-already-exists";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../useCases/register";

export async function register(req: FastifyRequest, res: FastifyReply) {
  // Sanitise data
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(req.body);

  try {
    await makeUseCase(PrismaUsersRepository, RegisterUseCase).execute({
      username,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send();
    }

    throw err;
  }

  return res.status(201).send();
}
