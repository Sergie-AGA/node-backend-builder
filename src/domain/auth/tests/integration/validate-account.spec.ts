import { expect, describe, it, beforeEach } from "vitest";
import { createTransport } from "nodemailer";
import { RegisterUseCase } from "@/domain/auth/use-cases/register";
// import { SendMailUseCase } from "@/domain/mail/use-cases/send-mail";
import { InMemoryUsersRepository } from "@/domain/auth/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;
// let sendMailUseCase: SendMailUseCase;

describe.skip("Register and Send e-mail Integration Test", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
    const transport = createTransport({
      jsonTransport: true,
    });
    sendMailUseCase = new SendMailUseCase(usersRepository, transport);
  });

  it.skip("should be able to register a user and send an e-mail", async () => {
    const { user } = await registerUseCase.execute({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const { emailSent } = await sendMailUseCase.execute({
      to: user.email,
      subject: "Welcome to our app!",
      body: `Hi ${user.username}, welcome to our app!`,
    });

    expect(emailSent).toBe(true);
  });
});

describe.skip("Activate account after registering", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
    const transport = createTransport({
      jsonTransport: true,
    });
    sendMailUseCase = new SendMailUseCase(usersRepository, transport);
  });

  it.skip("should be able to register a user and send an e-mail", async () => {
    const { user } = await registerUseCase.execute({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const { emailSent } = await sendMailUseCase.execute({
      to: user.email,
      subject: "Welcome to our app!",
      body: `Hi ${user.username}, welcome to our app!`,
    });

    expect(emailSent).toBe(true);
  });
});
