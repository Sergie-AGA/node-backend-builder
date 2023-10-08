import { EtherealMailProvider } from "../repositories/ethereal/ethereal-email-repository";
import { SendConfirmationEmailUseCase } from "../useCases/sendConfirmationEmail";

export function makeSendConfirmationEmailUseCase() {
  const emailsRepository = new SendConfirmationEmailUseCase();
  const sendConfirmationEmailUseCase = new SendConfirmationEmailUseCase(
    emailsRepository
  );

  return sendConfirmationEmailUseCase;
}
