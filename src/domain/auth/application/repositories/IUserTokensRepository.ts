import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { UserToken } from "../../enterprise/entities/userToken";

export interface IUserTokensRepository {
  create(data: UserToken): Promise<UserToken>;
  findById(id: UniqueEntityID | string): Promise<UserToken | null>;
  findByUserId(id: UniqueEntityID | string): Promise<UserToken | null>;
  delete(data: UserToken): Promise<void>;
}
