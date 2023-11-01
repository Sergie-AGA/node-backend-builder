import { User } from "../../enterprise/entities/user";

export interface IUsersRepository {
  create(data: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
