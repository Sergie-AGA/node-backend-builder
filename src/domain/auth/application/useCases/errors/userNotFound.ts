import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class UserNotFoundError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" was not found.`);
  }
}
