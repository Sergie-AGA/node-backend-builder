import { EtherealMailProvider } from "../repositories/ethereal/ethereal-email-repository";
import { SendConfirmationEmailUseCase } from "../use-cases/send-confirmation-email";

export function makeSendConfirmationEmailUseCase() {
  const emailsRepository = new SendConfirmationEmailUseCase();
  const sendConfirmationEmailUseCase = new SendConfirmationEmailUseCase(
    emailsRepository
  );

  return sendConfirmationEmailUseCase;
}
