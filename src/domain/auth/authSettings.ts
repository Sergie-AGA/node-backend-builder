import { z } from "zod";
import { ZodValidationPipe } from "@/domain/core/utils/pipes/zodValidationPipe";
import { PrismaUsersRepository } from "@/domain/auth/application/repositories/prisma/PrismaUsersRepository";

import { HasherProvider } from "@/services/cryptography/HasherProvider";
import { UserPresenter } from "./http/presenters/userPresenter";
import { User } from "./enterprise/entities/user";

const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type RegisterBodySchema = z.infer<typeof registerBodySchema>;
export type LoginBodySchema = z.infer<typeof registerBodySchema>;

const confirmBodySchema = z.object({
  id: z.string(),
});
export type ConfirmBodySchema = z.infer<typeof confirmBodySchema>;

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
}

// Confirm
export class ConfirmHandler {
  static get repository() {
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
