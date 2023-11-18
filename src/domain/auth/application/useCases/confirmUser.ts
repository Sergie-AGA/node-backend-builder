import { IUsersRepository } from "@/domain/auth/application/repositories/IUsersRepository";
import { UserAlreadyActiveError } from "./errors/userAlreadyActive";
import { User } from "../../enterprise/entities/user";
import { UserNotFoundError } from "./errors/userNotFound";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";
import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ConfirmBodySchema } from "../../authSettings";
import { DateProvider } from "@/services/dateProvider/dateProvider";
import { ResourceNotFoundError } from "@/domain/core/errors/resourceNotFoundError";
import { UserStatusNotAllowed } from "./errors/userStatusNotAllowed";
import { TokenUsedEvent } from "../../enterprise/events/tokenUsedEvent";
import { OnTokenUsed } from "../subscribers/onTokenUsed";

type ConfirmUserUseCaseResponse = Either<
  UserNotFoundError | UserAlreadyActiveError,
  {
    updatedUser: User;
  }
>;

export class ConfirmUserUseCase {
  constructor(
    private userTokensRepository: IUserTokensRepository,
    private usersRepository: IUsersRepository
  ) {}

  async execute(
    confirmUserData: ConfirmBodySchema
  ): Promise<ConfirmUserUseCaseResponse> {
    const token = await this.userTokensRepository.findById(confirmUserData.id);

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

    const user = await this.usersRepository.findById(token.userId);

    if (!user) {
      return left(new UserNotFoundError(token.userId));
    }

    if (user.status !== "registered") {
      return left(new UserStatusNotAllowed(token.userId));
    }

    token.addDeletionEvent(new TokenUsedEvent(token));
    new OnTokenUsed();

    const updatedUser = await this.usersRepository.validateUser(
      user.id,
      token.id
    );

    return right({ updatedUser });
  }
}
