-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RESET', 'ACCOUNT_CONFIRMATION');

-- CreateTable
CREATE TABLE "UserTokens" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expirationDateTime" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
