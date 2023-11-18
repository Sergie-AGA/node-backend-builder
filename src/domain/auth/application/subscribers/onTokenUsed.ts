import { DomainEvents } from "@/domain/core/events/domainEvents";
import { IEventHandler } from "@/domain/core/events/eventHandler";
import { TokenUsedEvent } from "../../enterprise/events/tokenUsedEvent";
import { ChangePasswordHandler } from "../../authSettings";

export class OnTokenUsed implements IEventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    const events = ChangePasswordHandler.tokenDeletionEvents;

    events.forEach((event) => {
      DomainEvents.register(event, TokenUsedEvent.name);
    });
  }
}
