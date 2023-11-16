import { DomainEvents } from "@/domain/core/events/domainEvents";
import { IEventHandler } from "@/domain/core/events/eventHandler";
import { UserCreatedEvent } from "@/domain/auth/enterprise/events/userCreatedEvent";
import { RegisterHandler } from "../../authSettings";
export class OnUserCreated implements IEventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    const events = RegisterHandler.userCreationEvents;

    events.forEach((event) => {
      DomainEvents.register(event, UserCreatedEvent.name);
    });
  }
}
