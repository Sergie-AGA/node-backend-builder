import { prisma } from "@/lib/prisma";
import { User } from "@/domain/auth/enterprise/entities/user";
import { IChangePasswordRequest, IUsersRepository } from "../IUsersRepository";
import { PrismaUserMapper } from "./mappers/PrismaUserMapper";

export class PrismaUsersRepository implements IUsersRepository {
  constructor() {}

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data,
    });

    return user;
  }

  async save(passwordData: IChangePasswordRequest): Promise<void> {
    await prisma.user.update({
      where: {
        id: passwordData.id,
      },
      data: {
        password_hash: passwordData.password,
      },
    });
  }

  async validateUser(id: string) {
    const response = await prisma.user.update({
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
