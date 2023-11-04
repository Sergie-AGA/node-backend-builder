import { IUsersRepository } from "@/domain/auth/application/repositories/IUsersRepository";
import { UserAlreadyActiveError } from "./errors/userAlreadyActive";
import { User } from "../../enterprise/entities/user";
import { UserNotFoundError } from "./errors/userNotFound";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";

type ConfirmUserUseCaseResponse = Either<
  UserNotFoundError | UserAlreadyActiveError,
  {
    updatedUser: User;
  }
>;

export class ConfirmUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<ConfirmUserUseCaseResponse> {
    console.log(123123);
    console.log(id);
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return left(new UserNotFoundError(id));
    }
    console.log(1);
    if (user.status == "active") {
      return left(new UserAlreadyActiveError(id));
    }
    console.log(2);

    const updatedUser = await this.usersRepository.validateUser(
      user.id.toString()
    );
    console.log(3);
    console.log(updatedUser);

    return right({ updatedUser });
  }
}
