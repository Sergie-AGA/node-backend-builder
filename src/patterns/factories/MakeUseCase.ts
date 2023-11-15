export function makeUseCase<UC, Repos extends any[]>(
  UseCase: new (...repos: Repos) => UC,
  ...repositories: { new (): Repos[number] }[]
) {
  const repoInstances = repositories.map((Repository) => new Repository());
  const useCase = new UseCase(...(repoInstances as Repos));
  return useCase;
}
