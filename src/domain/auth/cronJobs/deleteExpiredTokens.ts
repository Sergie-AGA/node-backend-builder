import { TokenHandler } from "../authSettings";

export default async function deleteExpiredTokens() {
  await TokenHandler.deleteExpiredTokensRepository();
}
