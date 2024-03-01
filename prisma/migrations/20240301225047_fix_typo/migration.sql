/*
  Warnings:

  - You are about to drop the column `presenterFullname` on the `Presentations` table. All the data in the column will be lost.
  - Added the required column `presenterFullName` to the `Presentations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Presentations" DROP COLUMN "presenterFullname",
ADD COLUMN     "presenterFullName" TEXT NOT NULL;
