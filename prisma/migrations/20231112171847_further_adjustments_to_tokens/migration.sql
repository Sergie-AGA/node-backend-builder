/*
  Warnings:

  - The values [PASSWORD_RESET,ACCOUNT_CONFIRMATION] on the enum `TokenType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TokenType_new" AS ENUM ('password_reset', 'account_confirmation');
ALTER TABLE "UserTokens" ALTER COLUMN "type" TYPE "TokenType_new" USING ("type"::text::"TokenType_new");
ALTER TYPE "TokenType" RENAME TO "TokenType_old";
ALTER TYPE "TokenType_new" RENAME TO "TokenType";
DROP TYPE "TokenType_old";
COMMIT;
