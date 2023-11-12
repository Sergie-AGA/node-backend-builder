/*
  Warnings:

  - The primary key for the `UserTokens` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserTokens_id_seq";
