import { UserToken as PrismaUserToken, Prisma } from "@prisma/client";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { UserToken } from "@/domain/auth/enterprise/entities/userToken";

export class PrismaUserTokenMapper {
  static toDomain(raw: PrismaUserToken): UserToken {
    return UserToken.create(
      {
        userId: raw.userId,
        type: raw.type,
        expirationDateTime: raw.expirationDateTime,
        used: raw.used,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(token: UserToken): Prisma.UserTokenUncheckedCreateInput {
    return {
      id: token.id.toString(),
      userId: token.userId,
      type: token.type,
      expirationDateTime: token.expirationDateTime,
      used: token.used,
      updated_at: new Date(),
    };
  }
}
