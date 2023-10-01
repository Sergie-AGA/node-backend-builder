import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";

interface userProps {
  username: string;
  email: string;
}

export class User extends Entity<userProps> {
  static create(props: userProps, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
