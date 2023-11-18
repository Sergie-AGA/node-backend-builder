import { User as PrismaUser, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { User } from "@/domain/auth/enterprise/entities/user";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        password: raw.passwordHash,
        status: raw.accountStatus,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      email: user.email,
      passwordHash: user.password,
      accountStatus: user.status,
      updatedAt: new Date(),
    };
  }
}
