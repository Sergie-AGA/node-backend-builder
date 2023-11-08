import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";

interface IUser {
  email: string;
  password: string;
  role?: "member" | "admin";
  status?: "registered" | "active" | "disabled";
}

export class User extends Entity<IUser> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get status() {
    return this.props.status;
  }

  get role() {
    return this.props.role;
  }

  set status(updatedStatus) {
    this.props.status = updatedStatus;
  }

  static create(props: IUser, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
