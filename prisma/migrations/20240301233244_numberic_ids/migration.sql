/*
  Warnings:

  - The primary key for the `Presentations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Presentations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Questions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Questions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `presentationId` on the `Questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_presentationId_fkey";

-- AlterTable
ALTER TABLE "Presentations" DROP CONSTRAINT "Presentations_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Presentations_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "presentationId",
ADD COLUMN     "presentationId" INTEGER NOT NULL,
ADD CONSTRAINT "Questions_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Questions_presentationId_createdAt_idx" ON "Questions"("presentationId", "createdAt");

-- CreateIndex
CREATE INDEX "Questions_presentationId_mark_createdAt_idx" ON "Questions"("presentationId", "mark", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_presentationId_content_key" ON "Questions"("presentationId", "content");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
