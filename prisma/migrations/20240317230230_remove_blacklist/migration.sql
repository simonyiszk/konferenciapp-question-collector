/*
  Warnings:

  - You are about to drop the column `blacklistedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_blacklistedAt_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "blacklistedAt";
