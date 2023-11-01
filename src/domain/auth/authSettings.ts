import { z } from "zod";
import { ZodValidationPipe } from "@/domain/core/utils/pipes/zodValidationPipe";
import { RegisterUseCase } from "@/domain/auth/application/useCases/register";
import { HasherProvider } from "@/services/cryptography/HasherProvider";
import { UserPresenter } from "./http/presenters/userPresenter";
import { User } from "./enterprise/entities/user";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;

// Register
export class RegisterHandler {
  static get repository() {
    return RegisterUseCase;
  }
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(registerBodySchema);
    return schema.transform(data);
  }

  static presenter(user: User) {
    return UserPresenter.toHTTPEmail(user);
  }

  static hash(password: string) {
    return HasherProvider.hash(password);
  }
}
