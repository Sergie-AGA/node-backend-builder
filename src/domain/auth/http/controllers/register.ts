import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { UserAlreadyExistsError } from "../../application/useCases/errors/userAlreadyExists";
import { RegisterUseCase } from "../../application/useCases/register";
import { genericError } from "@/domain/core/errors/genericError";
import { DomainEvents } from "@/domain/core/events/domainEvents";

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const userRaw = RegisterHandler.validate(req.body);

    const response = await makeUseCase(
      RegisterUseCase,
      RegisterHandler.repository
    ).execute(userRaw);

    if (response.isLeft()) {
      throw response.value;
    }

    const user = response.value.user;

    DomainEvents.clearHandlers();

    return res
      .status(201)
      .send({ attributes: RegisterHandler.presenter(user) });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      console.log(1);
      console.log(err);
      return res.status(409).send({ error: err.message });
    }

    return genericError(err, res);
  }
}
