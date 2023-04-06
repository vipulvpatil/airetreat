/*
  Warnings:

  - You are about to drop the column `bot_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `target_bot_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_bot_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "bot_id",
ADD COLUMN     "target_bot_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_target_bot_id_fkey" FOREIGN KEY ("target_bot_id") REFERENCES "bots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
