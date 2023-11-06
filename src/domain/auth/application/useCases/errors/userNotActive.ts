import { UseCaseError } from "@/domain/core/errors/use-case-error-interface";

export class UserNotActiveError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" not activated.`);
  }
}
