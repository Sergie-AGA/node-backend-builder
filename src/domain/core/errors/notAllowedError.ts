import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not allowed");
  }
}
