import { User } from "../../enterprise/entities/user";

export class UserPresenter {
  static toHTTPWithEmail(user: User) {
    return {
      id: user.id.toString(),
      email: user?.email,
    };
  }
}
