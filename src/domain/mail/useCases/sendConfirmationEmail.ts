import { UserAlreadyExistsError } from "@/domain/auth/errors/user-already-exists";
import { randomUUID } from "node:crypto";
import { resolve } from "path";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

interface SendConfirmationEmailUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

interface SendConfirmationEmailUseCaseResponse {
  user: User;
}

export class SendConfirmationEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: SendConfirmationEmailUseCaseRequest): Promise<SendConfirmationEmailUseCaseResponse> {
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

class SendForgotPasswordMailUseCase {
  constructor() {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "templates",
      "confirmAccount.hbs"
    );

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha",
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
