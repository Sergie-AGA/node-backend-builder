import { z } from "zod";
import { ZodValidationPipe } from "@/domain/core/utils/pipes/zodValidationPipe";
import { PrismaUsersRepository } from "@/domain/auth/application/repositories/prisma/PrismaUsersRepository";
import { HasherProvider } from "@/services/cryptography/HasherProvider";
import { UserPresenter } from "./http/presenters/userPresenter";
import { User } from "./enterprise/entities/user";
import { PrismaUserTokensRepository } from "./application/repositories/prisma/PrismaUserTokensRepository";
import { UserCreatedEvent } from "./enterprise/events/userCreatedEvent";
import { makeUseCase } from "@/patterns/factories/MakeUseCase";
import { CreateTokenUseCase } from "./application/useCases/createToken";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type RegisterBodySchema = z.infer<typeof registerBodySchema>;
export type LoginBodySchema = z.infer<typeof registerBodySchema>;

const confirmBodySchema = z.object({
  tokenId: z.string(),
  userId: z.string(),
});
export type ConfirmBodySchema = z.infer<typeof confirmBodySchema>;

const changePasswordBodySchema = z.object({
  tokenId: z.string(),
  userId: z.string(),
  password: z.string().min(6),
});
export type ChangePasswordBodySchema = z.infer<typeof changePasswordBodySchema>;

const tokenBodySchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  type: z.enum(["password_reset", "account_confirmation"]),
});
export type TokenBodySchema = z.infer<typeof tokenBodySchema>;

// Register
export class RegisterHandler {
  static get repository() {
    return PrismaUsersRepository;
  }
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(registerBodySchema);
    return schema.transform(data);
  }

  static presenter(user: User) {
    return UserPresenter.toHTTPWithEmail(user);
  }

  static hash(password: string) {
    return HasherProvider.hash(password);
  }

  static get allowUserCreationEvents() {
    return true;
  }

  static get userCreationEvents() {
    return [AuthEventHandler.createUserConfirmationToken];
  }
}

// Confirm
export class ConfirmHandler {
  static get tokenRepository() {
    return PrismaUserTokensRepository;
  }
  static get userRepository() {
    return PrismaUsersRepository;
  }
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(confirmBodySchema);
    return schema.transform(data);
  }

  static presenter(user: User) {
    return UserPresenter.toHTTPWithEmail(user);
  }
}

// Login
export class LoginHandler {
  static get repository() {
    return PrismaUsersRepository;
  }
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(registerBodySchema);
    return schema.transform(data);
  }

  // static presenter(user: User) {
  //   return UserPresenter.toHTTPEmail(user);
  // }

  static compare(password: string, hashedPassword: string) {
    return HasherProvider.compare(password, hashedPassword);
  }
}

// Change password
export class ChangePasswordHandler {
  static get tokenRepository() {
    return PrismaUserTokensRepository;
  }
  static get userRepository() {
    return PrismaUsersRepository;
  }
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(changePasswordBodySchema);
    return schema.transform(data);
  }
  static hash(password: string) {
    return HasherProvider.hash(password);
  }
}

// User Token
export class TokenHandler {
  static validate(data: unknown) {
    const schema = new ZodValidationPipe(tokenBodySchema);
    return schema.transform(data);
  }
  static get tokenRepository() {
    return PrismaUserTokensRepository;
  }
  static get userRepository() {
    return PrismaUsersRepository;
  }
  static get confirmationTokenHoursToExpiration() {
    return 72;
  }
  static get allowTokenDeletionEvents() {
    return true;
  }
}

// Events
export class AuthEventHandler {
  static async createUserConfirmationToken(event: unknown): Promise<void> {
    if (event instanceof UserCreatedEvent) {
      const { user } = event;
      await makeUseCase(
        CreateTokenUseCase,
        TokenHandler.tokenRepository,
        TokenHandler.userRepository
      ).execute({ userId: user.id.toString(), type: "account_confirmation" });
    }
  }
}
