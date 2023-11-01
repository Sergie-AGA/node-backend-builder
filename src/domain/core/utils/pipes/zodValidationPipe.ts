import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
import { ValidationError } from "@/domain/core/errors/validationError";

export class ZodValidationPipe {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        throw fromZodError(err);
      }

      throw new ValidationError();
    }
  }
}
