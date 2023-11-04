import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";
import { User } from "../../enterprise/entities/user";

export interface IUsersRepository {
  create(data: User): Promise<User>;
  validateUser(id: string): Promise<User>;
  findById(id: UniqueEntityID | string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
