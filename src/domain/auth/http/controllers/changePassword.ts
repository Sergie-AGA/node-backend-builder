import { FastifyRequest, FastifyReply } from "fastify";
import { ChangePasswordHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { genericError } from "@/domain/core/errors/genericError";
import { ChangePasswordUseCase } from "../../application/useCases/changePassword";
import { UserNotFoundError } from "../../application/useCases/errors/userNotFound";
import { UserStatusNotAllowed } from "../../application/useCases/errors/userStatusNotAllowed";
import { ResourceNotFoundError } from "@/domain/core/errors/resourceNotFoundError";

export async function changePassword(req: FastifyRequest, res: FastifyReply) {
  try {
    const passwordChangeData = ChangePasswordHandler.validate(req.body);

    const response = await makeUseCase(
      ChangePasswordUseCase,
      ChangePasswordHandler.tokenRepository,
      ChangePasswordHandler.userRepository
    ).execute(passwordChangeData);

    if (response.isLeft()) {
      throw response.value;
    }

    return res.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ error: err.message });
    }
    if (err instanceof UserStatusNotAllowed) {
      return res.status(403).send({ error: err.message });
    }

    return genericError(err, res);
  }
}
