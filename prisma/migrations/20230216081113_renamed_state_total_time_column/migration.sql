/*
  Warnings:

  - You are about to drop the column `current_state_total_time` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "current_state_total_time",
ADD COLUMN     "state_total_time" INTEGER NOT NULL DEFAULT 0;
