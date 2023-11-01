import { Either } from "../functionalErrorHandling/either";

type IUseCaseResponse<T> = Either<Error, T>;

export function errorHandlingPipe<T>(response: IUseCaseResponse<T>) {
  if (response.isLeft()) {
    throw response.value;
  } else {
    return response.value;
  }
}
