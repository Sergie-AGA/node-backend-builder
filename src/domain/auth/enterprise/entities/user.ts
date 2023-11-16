import { AggregateRoot } from "@/domain/core/entities/aggregateRoot";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { DomainEvent } from "@/domain/core/events/domainEvent";
import { RegisterHandler } from "../../authSettings";

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

  addCreationEvent(event: DomainEvent) {
    if (RegisterHandler.allowUserCreationEvents) {
      this.addDomainEvent(event);
    }
  }

  set status(updatedStatus) {
    this.props.status = updatedStatus;
  }

  static create(props: IUser, id?: UniqueEntityID) {
    const user = new User(props, id);

    return user;
  }
}
