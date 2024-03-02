/*
  Warnings:

  - The primary key for the `Presentation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_presentationId_fkey";

-- AlterTable
ALTER TABLE "Presentation" DROP CONSTRAINT "Presentation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Presentation_id_seq";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "presentationId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
