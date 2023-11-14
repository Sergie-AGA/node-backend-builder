import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ResourceAlreadyExistsError } from "@/domain/core/errors/resourceAlreadyExistsError";
import { TokenBodySchema } from "../../authSettings";
import { UserToken } from "../../enterprise/entities/userToken";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";

type CreateTokenUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    token: UserToken;
  }
>;

export class CreateTokenUseCase {
  constructor(private userTokensRepository: IUserTokensRepository) {}

  async execute(
    tokenData: TokenBodySchema
  ): Promise<CreateTokenUseCaseResponse> {
    const tokenExists = await this.userTokensRepository.findByUserId(
      tokenData.userId
    );

    if (tokenExists) {
      return left(new ResourceAlreadyExistsError());
    }

    const token = UserToken.create(tokenData);

    await this.userTokensRepository.create(token);

    return right({ token });
  }
}
