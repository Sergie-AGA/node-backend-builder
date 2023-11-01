import { hash, compare } from "bcryptjs";
import { IHasherProvider } from "../IHasherProvider";

export const BcryptHasherProvider: IHasherProvider = {
  HASH_SALT_LENGTH: 8,

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  },

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  },
};
