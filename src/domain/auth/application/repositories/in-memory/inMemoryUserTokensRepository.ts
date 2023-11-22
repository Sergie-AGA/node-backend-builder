import { IUserTokensRepository } from "../IUserTokensRepository";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { UserToken } from "@/domain/auth/enterprise/entities/userToken";

export class InMemoryUsersRepository implements IUserTokensRepository {
  public items: UserToken[] = [];

  async create(data: UserToken): Promise<UserToken> {
    this.items.push(data);
    return data;
  }
  async findById(id: string) {
    const token = this.items.find((item) => item.id.toString() === id);

    if (!token) {
      return null;
    }

    return token;
  }
  async findByUserId(id: string | UniqueEntityID): Promise<UserToken | null> {
    const token = this.items.find((item) => item.userId === id);

    if (!token) {
      return null;
    }

    return token;
  }

  async delete(data: UserToken) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id);

    this.items.splice(itemIndex, 1);
  }

  deleteAllExpired(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
