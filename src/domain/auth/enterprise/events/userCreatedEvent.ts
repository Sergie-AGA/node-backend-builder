import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { DomainEvent } from "@/domain/core/events/domainEvent";
import { User } from "../entities/user";

export class UserCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public user: User;

  constructor(user: User) {
    this.user = user;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
