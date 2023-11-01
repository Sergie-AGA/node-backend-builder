import { User } from "../../enterprise/entities/user";

export class UserPresenter {
  static toHTTPEmail(user: User) {
    return {
      email: user?.email,
    };
  }
}
