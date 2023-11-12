import { DomainEvents } from "@/domain/core/events/domainEvents";
import { EventHandler } from "@/domain/core/events/eventHandler";
import { UserCreatedEvent } from "@/domain/auth/enterprise/events/userCreatedEvent";
import { generalAuthSettings } from "../../authSettings";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";

const userRepository = new generalAuthSettings.repository();

export class OnUserCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.createUserConfirmationToken.bind(this),
      UserCreatedEvent.name
    );
  }

  private async createUserConfirmationToken({ user }: UserCreatedEvent) {
    await this.sendNotification.execute({
      recipientId: question.authorId.toString(),
      title: `Nova resposta em "${question.title
        .substring(0, 40)
        .concat("...")}"`,
      content: answer.excerpt,
    });
  }
}
