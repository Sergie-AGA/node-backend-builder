interface IHasherProvider {
  HASH_SALT_LENGTH: number;
  hash(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}

export { IHasherProvider };
