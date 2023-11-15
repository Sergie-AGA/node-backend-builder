import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ResourceAlreadyExistsError } from "@/domain/core/errors/resourceAlreadyExistsError";
import { TokenBodySchema } from "../../authSettings";
import { UserNotFoundError } from "./errors/userNotFound";
import { UserToken } from "../../enterprise/entities/userToken";
import {
  right,
  left,
  Either,
} from "@/domain/core/utils/functionalErrorHandling/either";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { UserStatusNotAllowed } from "./errors/userStatusNotAllowed";

type CreateTokenUseCaseResponse = Either<
  ResourceAlreadyExistsError | UserNotFoundError | UserStatusNotAllowed,
  {
    token: UserToken;
  }
>;

export class CreateTokenUseCase {
  constructor(
    private userTokensRepository: IUserTokensRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    tokenData: TokenBodySchema
  ): Promise<CreateTokenUseCaseResponse> {
    const user = await this.usersRepository.findById(tokenData.userId);

    if (!user) {
      return left(new UserNotFoundError(tokenData.userId));
    }
    if (
      (tokenData.type == "account_confirmation" &&
        user.status !== "registered") ||
      (tokenData.type == "password_reset" && user.status == "registered")
    ) {
      return left(new UserStatusNotAllowed(tokenData.userId));
    }

    const tokenExists = await this.userTokensRepository.findByUserId(
      tokenData.userId
    );

    if (tokenExists) {
      return left(new ResourceAlreadyExistsError());
    }

    const token = UserToken.create(tokenData);

    await this.userTokensRepository.create(token);

    return right({ token });
  }
}
