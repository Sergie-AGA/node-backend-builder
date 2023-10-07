// This file implements the factory pattern
export function makeUseCase<Repo, UC>(
  Repository: new () => Repo,
  UseCase: new (repository: Repo) => UC
) {
  // Define database/model to use
  const repository = new Repository();
  // Run execution
  const useCase = new UseCase(repository);

  return useCase;
}
