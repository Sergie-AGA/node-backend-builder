import { User } from "../../enterprise/entities/user";

export class UserPresenter {
  static toHTTPEmail(user: User) {
    return {
      id: user.id.toString(),
      email: user?.email,
    };
  }
}
