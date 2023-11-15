import { FastifyRequest, FastifyReply } from "fastify";
import { LoginHandler } from "../../authSettings";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { LoginUseCase } from "../../application/useCases/login";
import { genericError } from "@/domain/core/errors/genericError";
import { UserNotActiveError } from "../../application/useCases/errors/userNotActive";
import { InvalidCredentialsError } from "../../application/useCases/errors/invalidCredentialsError";

export async function login(req: FastifyRequest, res: FastifyReply) {
  try {
    const userRaw = LoginHandler.validate(req.body);

    const response = await makeUseCase(
      LoginUseCase,
      LoginHandler.repository
    ).execute(userRaw);

    if (response.isLeft()) {
      throw response.value;
    }

    const user = response.value?.user;

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id.toString(),
        },
      }
    );

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id.toString(),
          expiresIn: "7d",
        },
      }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        attributes: {
          token,
        },
      });
  } catch (err) {
    if (err instanceof UserNotActiveError) {
      return res.status(403).send({ error: err.message });
    }
    if (err instanceof InvalidCredentialsError) {
      return res.status(401).send({ error: err.message });
    }

    return genericError(err, res);
  }
}
