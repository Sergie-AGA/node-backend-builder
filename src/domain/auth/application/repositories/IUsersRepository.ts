import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { User } from "../../enterprise/entities/user";

export interface IChangePasswordRequest {
  id: string;
  password: string;
}

export interface IUsersRepository {
  create(data: User): Promise<User>;
  save({ id, password }: IChangePasswordRequest): Promise<void>;
  validateUser(id: string): Promise<User>;
  findById(id: UniqueEntityID | string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
