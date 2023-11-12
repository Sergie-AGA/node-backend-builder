import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class ResourceAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super("Resource already exists");
  }
}
