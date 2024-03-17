-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "Question" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;

ALTER TABLE "Question" ALTER COLUMN "updatedAt" SET NOT NULL;

