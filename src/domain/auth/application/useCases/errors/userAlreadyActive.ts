import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class UserAlreadyActiveError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already activated.`);
  }
}
