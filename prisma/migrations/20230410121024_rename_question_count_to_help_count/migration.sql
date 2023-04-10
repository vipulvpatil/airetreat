/*
  Warnings:

  - You are about to drop the column `question_count` on the `bots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bots" DROP COLUMN "question_count",
ADD COLUMN     "help_count" INTEGER NOT NULL DEFAULT 0;
