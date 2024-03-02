/*
  Warnings:

  - You are about to drop the `Presentation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_presentationId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropTable
DROP TABLE "Presentation";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "QuestionState";
