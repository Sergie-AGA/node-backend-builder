import { UniqueEntityID } from "../entities/uniqueEntityId";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityID;
}
