import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ResourceAlreadyExistsError } from "@/domain/core/errors/resourceAlreadyExistsError";
import {
  ChangePasswordBodySchema,
  ChangePasswordHandler,
  TokenBodySchema,
} from "../../authSettings";
import { UserNotFoundError } from "./errors/userNotFound";
import {
  right,
  left,
  Either,
} from "@/domain/core/utils/functionalErrorHandling/either";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { UserStatusNotAllowed } from "./errors/userStatusNotAllowed";
import { ResourceNotFoundError } from "@/domain/core/errors/resourceNotFoundError";
import { DateProvider } from "@/services/dateProvider/dateProvider";

type ChangePasswordUseCaseResponse = Either<ResourceAlreadyExistsError, null>;

export class ChangePasswordUseCase {
  constructor(
    private userTokensRepository: IUserTokensRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    changePasswordData: ChangePasswordBodySchema
  ): Promise<ChangePasswordUseCaseResponse> {
    const token = await this.userTokensRepository.findById(
      changePasswordData.tokenId
    );

    const dateProvider = new DateProvider();

    if (
      !token ||
      dateProvider.compareIfBefore(
        token.expirationDateTime,
        new Date() || token.type == "account_confirmation"
      )
    ) {
      return left(new ResourceNotFoundError());
    }

    const user = await this.usersRepository.findById(changePasswordData.userId);

    if (!user) {
      return left(new UserNotFoundError(changePasswordData.userId));
    }

    if (user.status == "registered") {
      return left(new UserStatusNotAllowed(changePasswordData.userId));
    }

    const password_hash = await ChangePasswordHandler.hash(
      changePasswordData.password
    );

    await this.usersRepository.changePassword({
      id: user.id.toString(),
      password: password_hash,
    });

    return right(null);
  }
}
