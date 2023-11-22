import { expect, describe, it, beforeEach } from "vitest";
import { ConfirmUserUseCase } from "../../application/useCases/confirmUser";
import { InMemoryUsersRepository } from "@/domain/auth/application/repositories/in-memory/inMemoryUsersRepository";
import { UserNotFoundError } from "../../application/useCases/errors/userNotFound";
import { UserAlreadyActiveError } from "../../application/useCases/errors/userAlreadyActive";
import { mockUser } from "../mocks/mockUser";
import { User } from "../../enterprise/entities/user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: ConfirmUserUseCase;

// can't create preexisting token, can create token

describe("Confirm User Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new ConfirmUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a token", async () => {});

  it("should not be able to create a duplicated token", async () => {});
});
