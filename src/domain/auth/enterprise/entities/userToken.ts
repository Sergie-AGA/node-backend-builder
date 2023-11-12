import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { Optional } from "@/domain/core/types/optional";
import { DateProvider } from "@/services/dateProvider/dateProvider";
import { TokenHandler } from "../../authSettings";

interface IUserToken {
  userId: string;
  type: "password_reset" | "account_confirmation";
  expirationDateTime: Date;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class UserToken extends Entity<IUserToken> {
  get userId() {
    return this.props.userId;
  }

  get type() {
    return this.props.type;
  }

  get expirationDateTime() {
    return this.props.expirationDateTime;
  }

  static create(
    props: Optional<IUserToken, "expirationDateTime" | "createdAt">,
    id?: UniqueEntityID
  ) {
    const user = new UserToken(
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

    return user;
  }
}
