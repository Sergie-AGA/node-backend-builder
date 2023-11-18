import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { User } from "../../enterprise/entities/user";

export interface IChangePasswordRequest {
  userId: UniqueEntityID;
  password: string;
  tokenId: UniqueEntityID;
}

export interface IUsersRepository {
  create(data: User): Promise<User>;
  changePassword({
    userId,
    password,
    tokenId,
  }: IChangePasswordRequest): Promise<void>;
  validateUser(userId: UniqueEntityID, tokenId: UniqueEntityID): Promise<User>;
  findById(id: UniqueEntityID | string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
