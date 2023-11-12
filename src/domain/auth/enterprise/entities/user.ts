import { AggregateRoot } from "@/domain/core/entities/aggregateRoot";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { UserCreatedEvent } from "../events/userCreatedEvent";

interface IUser {
  email: string;
  password: string;
  role?: "member" | "admin";
  status?: "registered" | "active" | "disabled";
}

export class User extends AggregateRoot<IUser> {
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

    const isNewUser = !id;

    if (isNewUser) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}
