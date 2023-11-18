import { prisma } from "@/lib/prisma";
import { User } from "@/domain/auth/enterprise/entities/user";
import { IChangePasswordRequest, IUsersRepository } from "../IUsersRepository";
import { PrismaUserMapper } from "./mappers/PrismaUserMapper";
import { DomainEvents } from "@/domain/core/events/domainEvents";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";

export class PrismaUsersRepository implements IUsersRepository {
  constructor() {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data,
    });

    DomainEvents.dispatchEventsForAggregate(user.id);

    return user;
  }

  async changePassword(passwordData: IChangePasswordRequest): Promise<void> {
    await prisma.user.update({
      where: {
        id: passwordData.userId.toString(),
      },
      data: {
        passwordHash: passwordData.password,
      },
    });

    DomainEvents.dispatchEventsForAggregate(passwordData.tokenId);
  }

  async validateUser(userId: UniqueEntityID, tokenId: UniqueEntityID) {
    const response = await prisma.user.update({
      where: {
        id: userId.toString(),
      },
      data: {
        accountStatus: "active",
      },
    });

    DomainEvents.dispatchEventsForAggregate(tokenId);
    const updatedUser = PrismaUserMapper.toDomain(response);

    return updatedUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
