-- CreateEnum
CREATE TYPE "QuestionState" AS ENUM ('NONE', 'SELECTED', 'HIDDEN');

-- CreateTable
CREATE TABLE "Presentation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "room" TEXT NOT NULL,
    "presenterFullName" TEXT NOT NULL,
    "presenterAvatar" TEXT,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blacklistedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "presentationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mark" "QuestionState" NOT NULL DEFAULT 'NONE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_title_key" ON "Presentation"("title");

-- CreateIndex
CREATE INDEX "Presentation_start_idx" ON "Presentation"("start");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_start_room_key" ON "Presentation"("start", "room");

-- CreateIndex
CREATE UNIQUE INDEX "Presentation_end_room_key" ON "Presentation"("end", "room");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_blacklistedAt_idx" ON "User"("blacklistedAt");

-- CreateIndex
CREATE INDEX "Question_presentationId_createdAt_idx" ON "Question"("presentationId", "createdAt");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
