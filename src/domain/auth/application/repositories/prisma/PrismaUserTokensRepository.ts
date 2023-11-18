import { prisma } from "@/lib/prisma";
import { UserToken } from "@/domain/auth/enterprise/entities/userToken";
import { IUserTokensRepository } from "../IUserTokensRepository";
import { PrismaUserTokenMapper } from "./mappers/PrismaUserTokenMapper";

export class PrismaUserTokensRepository implements IUserTokensRepository {
  constructor() {}

  async create(token: UserToken): Promise<UserToken> {
    const data = PrismaUserTokenMapper.toPrisma(token);

    await prisma.userToken.create({
      data,
    });

    return token;
  }

  async findById(id: string): Promise<UserToken | null> {
    const token = await prisma.userToken.findUnique({
      where: {
        id,
      },
    });

    if (!token) {
      return null;
    }

    return PrismaUserTokenMapper.toDomain(token);
  }

  async findByUserId(userId: string): Promise<UserToken | null> {
    const token = await prisma.userToken.findFirst({
      where: {
        userId,
      },
    });

    if (!token) {
      return null;
    }

    return PrismaUserTokenMapper.toDomain(token);
  }

  async delete(userToken: UserToken): Promise<void> {
    await prisma.userToken.delete({
      where: {
        id: userToken.id.toString(),
      },
    });
  }

  async deleteAllExpired() {
    await prisma.userToken.deleteMany({
      where: {
        expirationDateTime: {
          lte: new Date(),
        },
      },
    });
  }
}
