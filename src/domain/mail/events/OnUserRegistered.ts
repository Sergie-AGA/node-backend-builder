import { IUser } from "@/domain/auth/enterprise/entities/user";
import { EtherealEmailRepository } from "../repositories/ethereal/ethereal-email-repository";
import { SendConfirmationEmailUseCase } from "../useCases/sendConfirmationEmail";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { resolve } from "path";
import { errorLog } from "@/services/errorLogging/errorLog";
import { PubSub } from "@/patterns/pubSub/GeneralPubSub";

export function OnUserRegistered(user: IUser) {
  const { email } = user;
  const from = "noreply@example.com";
  const to = email;
  const subject = "Confirm your account";
  const templatePath = resolve(
    __dirname,
    "..",
    "templates",
    "confirmAccount.hbs"
  );

  try {
    makeUseCase(EtherealEmailRepository, SendConfirmationEmailUseCase).execute({
      from,
      to,
      subject,
      templatePath,
    });
  } catch (err) {
    errorLog(err);
  }
}
