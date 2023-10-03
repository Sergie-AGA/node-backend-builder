import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "@/domain/auth/factories/make-register-use-case";
import { UserAlreadyExistsError } from "@/domain/auth/errors/user-already-exists";

export async function sendConfirmEmail(req: FastifyRequest, res: FastifyReply) {
  const sendConfirmEmailBodySchema = z.object({
    from: z.string(),
    to: z.string().email(),
    subject: z.string(),
    html: z.string(),
  });

  const { from, to, subject, html } = sendConfirmEmailBodySchema.parse(
    req.body
  );

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ username, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send();
    }

    throw err;
  }

  return res.status(201).send();
}
