import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class UserNotActiveError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" not activated.`);
  }
}
