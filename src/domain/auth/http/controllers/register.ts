import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { UserAlreadyExistsError } from "../../application/useCases/errors/userAlreadyExists";
import { RegisterUseCase } from "../../application/useCases/register";
import { genericError } from "@/domain/core/errors/genericError";
import { PubSub } from "@/patterns/pubSub/GeneralPubSub";
import { OnUserRegistered } from "@/domain/mail/events/OnUserRegistered";

export async function register(req: FastifyRequest, res: FastifyReply) {
  try {
    const userRaw = RegisterHandler.validate(req.body);

    const response = await makeUseCase(
      RegisterHandler.repository,
      RegisterUseCase
    ).execute(userRaw);

    if (response.isLeft()) {
      throw response.value;
    }

    const user = response.value.user;

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
