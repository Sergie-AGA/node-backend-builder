import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { Optional } from "@/domain/core/types/optional";
import { DateProvider } from "@/services/dateProvider/dateProvider";
import { TokenHandler } from "../../authSettings";
import { DomainEvent } from "@/domain/core/events/domainEvent";
import { AggregateRoot } from "@/domain/core/entities/aggregateRoot";

interface IUserToken {
  userId: string;
  type: "password_reset" | "account_confirmation";
  expirationDateTime: Date;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class UserToken extends AggregateRoot<IUserToken> {
  get userId() {
    return this.props.userId;
  }

  get type() {
    return this.props.type;
  }

  get expirationDateTime() {
    return this.props.expirationDateTime;
  }

  addDeletionEvent(event: DomainEvent) {
    if (TokenHandler.allowTokenDeletionEvents) {
      this.addDomainEvent(event);
    }
  }

  static create(
    props: Optional<IUserToken, "expirationDateTime" | "createdAt">,
    id?: UniqueEntityID
  ) {
    const userToken = new UserToken(
      {
        ...props,
        expirationDateTime:
          props.expirationDateTime ??
          new DateProvider().addHours(
            TokenHandler.confirmationTokenHoursToExpiration
          ),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return userToken;
  }
}
