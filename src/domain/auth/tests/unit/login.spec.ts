import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "@/domain/auth/application/useCases/register";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/in-memory-users-repository";
import { mockUser } from "../mocks/mockUser";
import { User } from "../../enterprise/entities/user";
import { InvalidCredentialsError } from "../../application/useCases/errors/invalid-credentials-error";
import { UserNotActiveError } from "../../application/useCases/errors/userNotActive";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Login Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to log in", async () => {
    let user = User.create({ ...mockUser, status: "active" });

    usersRepository.items.push(user);

    const response;

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("should not be able to log in with an unconfirmed account", async () => {
    const register;

    expect(() =>
      sut.execute({
        mockUser,
      })
    ).rejects.toBeInstanceOf(UserNotActiveError);
  });

  it("should not be able to log in with the wrong credentials", async () => {
    const register;

    expect(() =>
      sut.execute({
        ...mockUser,
        email: "wrong@wrong.com",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
    expect(() =>
      sut.execute({
        ...mockUser,
        password: "thisIsJustWrong",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
