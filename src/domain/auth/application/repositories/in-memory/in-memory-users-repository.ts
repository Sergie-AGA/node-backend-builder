import { User } from "@/domain/auth/enterprise/entities/user";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: User) {
    this.items.push(data);

    return data;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

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
