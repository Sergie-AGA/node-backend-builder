import { UseCaseError } from "@/core/errors/use-case-error-interface";

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super("Not allowed");
  }
}
