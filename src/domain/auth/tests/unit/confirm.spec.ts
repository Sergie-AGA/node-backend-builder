import { expect, describe, it, beforeEach } from "vitest";
import { ConfirmUserUseCase } from "../../application/useCases/confirmUser";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/in-memory-users-repository";
import { UserNotFoundError } from "../../application/useCases/errors/userNotFound";
import { UserAlreadyActiveError } from "../../application/useCases/errors/userAlreadyActive";
import { mockUser } from "../mocks/mockUser";
import { User } from "../../enterprise/entities/user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: ConfirmUserUseCase;

describe("Confirm User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new ConfirmUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to confirm a registered user", async () => {
    let user = User.create({ ...mockUser, status: "registered" });

    inMemoryUsersRepository.items.push(user);

    await sut.execute(user.id.toString());

    const status = inMemoryUsersRepository.items[0].status;

    expect(status).toBe("active");
  });

  it.skip("should hash user password upon registration", async () => {
    const user = await sut.execute(mockUser);

    const isPasswordCorrectlyHashed = await compare("123456", user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it.skip("should not be able to register a user with the same email twice", async () => {
    await sut.execute(mockUser);

    await expect(() => sut.execute(mockUser)).rejects.toBeInstanceOf(
      UserAlreadyExistsError
    );
  });
});
