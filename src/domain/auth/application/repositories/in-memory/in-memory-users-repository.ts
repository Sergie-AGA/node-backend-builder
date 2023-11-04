import { User } from "@/domain/auth/enterprise/entities/user";
import { IUsersRepository } from "../IUsersRepository";
import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: User) {
    this.items.push(data);
    return data;
  }

  async validateUser(id: string) {
    const index = this.items.findIndex((el) => el.id.toString() === id);

    this.items[index].status = "active";

    return this.items[index];
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
