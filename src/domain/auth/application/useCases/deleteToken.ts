import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { ResourceNotFoundError } from "@/domain/core/errors/resourceNotFoundError";
import {
  Either,
  right,
  left,
} from "@/domain/core/utils/functionalErrorHandling/either";

type DeleteTokenUseCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteTokenUseCase {
  constructor(private userTokensRepository: IUserTokensRepository) {}

  async execute(id: string): Promise<DeleteTokenUseCaseResponse> {
    const token = await this.userTokensRepository.findById(id);

    if (!token) {
      return left(new ResourceNotFoundError());
    }

    await this.userTokensRepository.delete(token);

    return right(null);
  }
}
