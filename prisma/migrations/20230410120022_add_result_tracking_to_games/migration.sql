/*
  Warnings:

  - A unique constraint covering the columns `[winning_bot_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "result" TEXT,
ADD COLUMN     "winning_bot_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "games_winning_bot_id_key" ON "games"("winning_bot_id");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_winning_bot_id_fkey" FOREIGN KEY ("winning_bot_id") REFERENCES "bots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
