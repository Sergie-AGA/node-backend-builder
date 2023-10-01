import { hash } from "bcryptjs";
import { UsersRepository } from "@/domain/auth/repositories/IUsersRepository";
import { UserAlreadyExistsError } from "@/domain/auth/errors/user-already-exists";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
