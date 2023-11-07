import { expect, describe, it, beforeEach } from "vitest";
import { LoginUseCase } from "@/domain/auth/application/useCases/login";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/in-memory-users-repository";
import { mockUser } from "../mocks/mockUser";
import { User } from "../../enterprise/entities/user";
import { RegisterHandler } from "../../authSettings";
import { InvalidCredentialsError } from "../../application/useCases/errors/invalid-credentials-error";
import { UserNotActiveError } from "../../application/useCases/errors/userNotActive";

let usersRepository: InMemoryUsersRepository;
let sut: LoginUseCase;

describe("Login Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new LoginUseCase(usersRepository);
  });

  it("should be able to log in", async () => {
    let user = User.create({
      ...mockUser,
      password: await RegisterHandler.hash("123456"),
      status: "active",
    });

    usersRepository.items.push(user);

    const response = await sut.execute(mockUser);

    const responseUser = response.isRight() ? response.value.user : null;

    expect(response.isRight()).toBe(true);
    expect(responseUser).toEqual(
      expect.objectContaining({ email: mockUser.email })
    );
  });

  it("should not be able to log in with an unconfirmed account", async () => {
    let user = User.create({
      ...mockUser,
      password: await RegisterHandler.hash("123456"),
    });

    usersRepository.items.push(user);

    const response = await sut.execute(mockUser);

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotActiveError);
  });

  it("should not be able to log in with the wrong credentials", async () => {
    let user = User.create({
      ...mockUser,
      password: await RegisterHandler.hash("123456"),
    });

    usersRepository.items.push(user);

    const response1 = await sut.execute({
      ...mockUser,
      email: "wrong@wrong.com",
    });
    const response2 = await sut.execute({
      ...mockUser,
      password: "1234567",
    });

    expect(response1.isLeft()).toBe(true);
    expect(response2.isLeft()).toBe(true);
    expect(response1.value).toBeInstanceOf(InvalidCredentialsError);
    expect(response2.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
