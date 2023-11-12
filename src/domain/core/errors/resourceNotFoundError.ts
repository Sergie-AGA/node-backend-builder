import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super("Resource not found");
  }
}
