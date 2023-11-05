// import { prisma } from "@/lib/prisma";
import { User } from "@/domain/auth/enterprise/entities/user";
import { IUsersRepository } from "../IUsersRepository";
import { PrismaUserMapper } from "./mappers/PrismaUserMapper";
import { PrismaClient } from "@prisma/client";

export class PrismaUsersRepository implements IUsersRepository {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });

    return user;
  }

  async validateUser(id: string) {
    const response = await this.prisma.user.update({
      where: {
        id: id.toString(),
      },
      data: {
        account_status: "active",
      },
    });

    const updatedUser = PrismaUserMapper.toDomain(response);

    return updatedUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
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
