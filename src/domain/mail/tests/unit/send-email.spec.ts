import { expect, describe, it, beforeEach } from "vitest";
import "dotenv/config";

// let emailsRepository: InMemoryEmailsRepository;
// let sut: NodemailerMock;

// const transport = nodemailermock.createTransport();

describe("Send e-mail Use Case", () => {
  // beforeEach(() => {
  //   usersRepository = new InMemoryEmailsRepository();
  //   sut = new RegisterUseCase(usersRepository);
  // });

  it.skip("should be able to send an e-mail", async () => {
    const { user } = await sut.execute({
      from: "sender@example.com",
      to: process.env.TEST_EMAIL,
      subject: "Test email subject",
      textPath: "",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
