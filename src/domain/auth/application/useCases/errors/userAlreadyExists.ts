import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" has already been registered.`);
  }
}
