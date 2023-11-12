/*
  Warnings:

  - You are about to drop the `UserTokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_userId_fkey";

-- DropTable
DROP TABLE "UserTokens";

-- CreateTable
CREATE TABLE "userTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expirationDateTime" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userTokens" ADD CONSTRAINT "userTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
