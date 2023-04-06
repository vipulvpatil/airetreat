/*
  Warnings:

  - Added the required column `source_bot_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "source_bot_id" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_source_bot_id_fkey" FOREIGN KEY ("source_bot_id") REFERENCES "bots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
