/*
  Warnings:

  - You are about to drop the column `botId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `bot_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_botId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "botId",
ADD COLUMN     "bot_id" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_bot_id_fkey" FOREIGN KEY ("bot_id") REFERENCES "bots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
