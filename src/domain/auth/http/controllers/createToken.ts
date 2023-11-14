import { FastifyRequest, FastifyReply } from "fastify";
import { TokenHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { CreateTokenUseCase } from "../../application/useCases/createToken";
import { genericError } from "@/domain/core/errors/genericError";
import { ResourceAlreadyExistsError } from "@/domain/core/errors/resourceAlreadyExistsError";

export async function createToken(req: FastifyRequest, res: FastifyReply) {
  try {
    const tokenRaw = TokenHandler.validate(req.body);

    const response = await makeUseCase(
      TokenHandler.repository,
      CreateTokenUseCase
    ).execute(tokenRaw);

    if (response.isLeft()) {
      throw response.value;
    }

    // const token = response.value.token;

    return res.status(201).send();
  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return res.status(409).send({ error: err.message });
    }

    return genericError(err, res);
  }
}
