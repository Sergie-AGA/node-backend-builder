import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/unique-entity-id";

interface emailProps {
  from: string;
  to: string;
  subject: string;
  contentPath: string;
}

export class Email extends Entity<emailProps> {
  get from() {
    return this.props.from;
  }

  get to() {
    return this.props.to;
  }

  get subject() {
    return this.props.subject;
  }

  get contentPath() {
    return this.props.contentPath;
  }

  static create(props: emailProps, id?: UniqueEntityID) {
    const email = new Email(props, id);

    return email;
  }
}
