import { expect, describe, it, beforeEach } from "vitest";
import { ConfirmUserUseCase } from "../../application/useCases/confirmUser";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/inMemoryUsersRepository";
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

  it("should not be able to confirm a non-existing user", async () => {
    let user = User.create({ ...mockUser, status: "registered" });

    inMemoryUsersRepository.items.push(user);

    const response = await sut.execute("123");

    const error = response.value;

    expect(error).toBeInstanceOf(UserNotFoundError);
  });

  it("should not be able to use an expired or inexistent token", async () => {
    let user = User.create({ ...mockUser, status: "registered" });

    inMemoryUsersRepository.items.push(user);

    const response = await sut.execute("123");

    const error = response.value;

    expect(error).toBeInstanceOf(UserNotFoundError);
  });

  it("should not be able to confirm a user for the second time", async () => {
    let user = User.create({ ...mockUser, status: "registered" });

    inMemoryUsersRepository.items.push(user);

    await sut.execute(user.id.toString());
    const response = await sut.execute(user.id.toString());

    const error = response.value;

    expect(error).toBeInstanceOf(UserAlreadyActiveError);
  });
});
