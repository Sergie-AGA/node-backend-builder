export class ValidationError extends Error {
  constructor() {
    super("Validation failed");
  }
}
