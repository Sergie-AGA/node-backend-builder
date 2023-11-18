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
import { OnTokenUsed } from "../subscribers/onTokenUsed";
import { TokenUsedEvent } from "../../enterprise/events/tokenUsedEvent";
import { SamePasswordChangeError } from "./errors/samePasswordChange";

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
      return left(new UserNotFoundError(token.userId));
    }

    if (user.status == "registered") {
      return left(new UserStatusNotAllowed(token.userId));
    }

    if (
      await ChangePasswordHandler.compare(
        changePasswordData.password,
        user.password
      )
    ) {
      return left(new SamePasswordChangeError());
    }

    const passwordHash = await ChangePasswordHandler.hash(
      changePasswordData.password
    );

    token.addDeletionEvent(new TokenUsedEvent(token));
    new OnTokenUsed();

    await this.usersRepository.changePassword({
      userId: user.id,
      password: passwordHash,
      tokenId: token.id,
    });

    return right(null);
  }
}
