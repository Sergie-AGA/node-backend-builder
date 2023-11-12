import { Entity } from "@/domain/core/entities/entity";
import { UniqueEntityID } from "@/domain/core/entities/uniqueEntityId";
import { z } from "zod";

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
    const sendConfirmEmailBodySchema = z.object({
      to: z.string().email(),
      subject: z.string(),
      html: z.string(),
    });
    const   sendConfirmEmailBodySchema.parse(props);

    this.props = 

    const email = new Email(props, id);

    return email;
  }
}
