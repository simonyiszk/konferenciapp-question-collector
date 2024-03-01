-- CreateEnum
CREATE TYPE "QuestionState" AS ENUM ('MARKED', 'BLACKLISTED');

-- CreateTable
CREATE TABLE "Presentations" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "room" TEXT NOT NULL,
    "presenterFullname" TEXT NOT NULL,
    "presenterAvatar" TEXT,

    CONSTRAINT "Presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Askers" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blacklistedAt" TIMESTAMP(3),

    CONSTRAINT "Askers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "askerId" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mark" "QuestionState",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presentations_title_key" ON "Presentations"("title");

-- CreateIndex
CREATE INDEX "Presentations_start_idx" ON "Presentations"("start");

-- CreateIndex
CREATE UNIQUE INDEX "Presentations_start_room_key" ON "Presentations"("start", "room");

-- CreateIndex
CREATE UNIQUE INDEX "Presentations_end_room_key" ON "Presentations"("end", "room");

-- CreateIndex
CREATE UNIQUE INDEX "Askers_id_key" ON "Askers"("id");

-- CreateIndex
CREATE INDEX "Askers_blacklistedAt_idx" ON "Askers"("blacklistedAt");

-- CreateIndex
CREATE INDEX "Questions_presentationId_createdAt_idx" ON "Questions"("presentationId", "createdAt");

-- CreateIndex
CREATE INDEX "Questions_presentationId_mark_createdAt_idx" ON "Questions"("presentationId", "mark", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Questions_presentationId_content_key" ON "Questions"("presentationId", "content");

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_askerId_fkey" FOREIGN KEY ("askerId") REFERENCES "Askers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
