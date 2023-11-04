import { RegisterHandler } from "../../authSettings";
import { IUsersRepository } from "@/domain/auth/application/repositories/IUsersRepository";
import { UserAlreadyExistsError } from "@/domain/auth/application/useCases/errors/userAlreadyExists";
import { User } from "../../enterprise/entities/user";
import { RegisterBodySchema } from "../../authSettings";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";

type RegisterUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    userData: RegisterBodySchema
  ): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(
      userData.email
    );

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(userData.email));
    }

    const password_hash = await RegisterHandler.hash(userData.password);

    const user = User.create({
      ...userData,
      password: password_hash,
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}
