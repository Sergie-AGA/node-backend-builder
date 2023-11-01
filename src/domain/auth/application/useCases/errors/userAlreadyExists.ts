import { UseCaseError } from "@/domain/core/errors/use-case-error-interface";

export class UserAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists.`);
  }
}
