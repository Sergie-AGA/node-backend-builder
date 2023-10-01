import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "@/domain/auth/use-cases/register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/domain/auth/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/domain/auth/errors/user-already-exists";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      username: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a user with the same email twice", async () => {
    const email = "john.doe@gmail.com";

    await sut.execute({
      username: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        username: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
