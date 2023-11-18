import { UseCaseError } from "@/domain/core/errors/useCaseErrorInterface";

export class SamePasswordChangeError extends Error implements UseCaseError {
  constructor() {
    super(`New password cannot be the same as the old password.`);
  }
}
