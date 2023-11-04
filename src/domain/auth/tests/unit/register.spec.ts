import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "@/domain/auth/application/useCases/register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/domain/auth/application/useCases/errors/userAlreadyExists";
import { mockUser } from "../mocks/mockUser";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    await sut.execute(mockUser);

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({ email: mockUser.email })
    );
    expect(usersRepository.items).toHaveLength(1);
  });

  it("should hash user password upon registration", async () => {
    const user = await sut.execute(mockUser);

    if (user.isLeft()) {
      throw Error;
    }

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.value.user.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a user with the same email twice", async () => {
    await sut.execute(mockUser);

    const response = await sut.execute(mockUser);

    expect(response.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
