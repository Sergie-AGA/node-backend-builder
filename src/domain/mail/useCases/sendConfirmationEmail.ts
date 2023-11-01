import { randomUUID } from "node:crypto";
import { IEmailRepository } from "../repositories/IEmailRepository";
import { DateProvider } from "@/services/dateProvider/dateProvider";
import { applicationSettings } from "@/domain/applicationSettings";
interface SendConfirmationEmailUseCaseRequest {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class SendConfirmationEmailUseCase {
  constructor(private emailRepository: IEmailRepository) {}

  async execute({
    from,
    to,
    subject,
  }: SendConfirmationEmailUseCaseRequest): Promise<void> {
    const token = randomUUID();

    const dateProvider = new DateProvider();

    const expires_date = dateProvider.addHours(3);

    const variables = {
      link: `${process.env.MAIL_URL}${token}`,
    };

    await this.emailRepository.sendMail(
      to,
      `${applicationSettings.title} - Confirm your account`,
      variables,
      templatePath
    );
  }
}
