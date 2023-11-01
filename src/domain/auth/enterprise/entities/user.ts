import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";
import { RegisterBodySchema as IUser } from "../../authSettings";

export class User extends Entity<IUser> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: IUser, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
