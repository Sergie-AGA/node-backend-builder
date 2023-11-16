import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { DomainEvent } from "@/domain/core/events/domainEvent";
import { UserToken } from "../entities/userToken";

export class TokenUsedEvent implements DomainEvent {
  public ocurredAt: Date;
  public token: UserToken;

  constructor(token: UserToken) {
    this.token = token;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.token.id;
  }
}
