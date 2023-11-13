import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ResourceNotFoundError } from "@/domain/core/errors/resourceNotFoundError";
import { UserToken } from "../../enterprise/entities/userToken";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";

type CreateTokenUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    token: UserToken;
  }
>;

export class GetTokenUserUseCase {
  constructor(private userTokensRepository: IUserTokensRepository) {}

  async execute(id: string): Promise<CreateTokenUseCaseResponse> {
    const token = await this.userTokensRepository.findById(id);

    if (!token) {
      return left(new ResourceNotFoundError());
    }

    return right({ token });
  }
}
