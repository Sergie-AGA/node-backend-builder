import { FastifyRequest, FastifyReply } from "fastify";
import { ConfirmHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { ConfirmUserUseCase } from "../../application/useCases/confirmUser";
import { genericError } from "@/domain/core/errors/genericError";
import { UserNotFoundError } from "../../application/useCases/errors/userNotFound";
import { UserAlreadyActiveError } from "../../application/useCases/errors/userAlreadyActive";

export async function confirm(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = ConfirmHandler.validate(req.body);

    const response = await makeUseCase(
      ConfirmHandler.repository,
      ConfirmUserUseCase
    ).execute(id);

    if (response.isLeft()) {
      throw response.value;
    }

    const user = response.value.updatedUser;

    return res.status(200).send({ attributes: ConfirmHandler.presenter(user) });
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    if (err instanceof UserAlreadyActiveError) {
      return res.status(409).send({ error: err.message });
    }

    return genericError(err, res);
  }
}
