import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { PrismaUsersRepository } from "@/domain/auth/application/repositories/prisma/PrismaUsersRepository";
import { UserAlreadyExistsError } from "../../application/useCases/errors/userAlreadyExists";
import { PubSub } from "@/patterns/pubSub/GeneralPubSub";
import { OnUserRegistered } from "@/domain/mail/events/OnUserRegistered";
import { genericError } from "@/domain/core/errors/genericError";
import { errorHandlingPipe } from "@/domain/core/utils/pipes/presenterErrorHandlingPipe";

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const userRaw = RegisterHandler.validate(req.body);

    const user = await makeUseCase(
      PrismaUsersRepository,
      RegisterHandler.repository
    ).execute(userRaw);

    return res
      .status(201)
      .send({ attributes: RegisterHandler.presenter(user) });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ error: err.message });
    }

    return genericError(err, res);
  }

  // const eventName = "userRegistered";

  // PubSub.subscribe(eventName, OnUserRegistered);

  // PubSub.unsubscribe(eventName, OnUserRegistered);

  // TODO: Implement retry system
  // PubSub.publish(eventName, user);
  // PubSub.unsubscribe(eventName, OnUserRegistered);
}
