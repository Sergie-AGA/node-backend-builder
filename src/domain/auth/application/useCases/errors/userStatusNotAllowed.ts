import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class UserStatusNotAllowed extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(
      `User "${identifier}" does not have an activation status that allows this operation.`
    );
  }
}
