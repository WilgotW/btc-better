/*
  Warnings:

  - You are about to drop the column `bet_end` on the `bets` table. All the data in the column will be lost.
  - You are about to drop the column `bet_start` on the `bets` table. All the data in the column will be lost.
  - Added the required column `enddate` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startdate` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bets" DROP COLUMN "bet_end",
DROP COLUMN "bet_start",
ADD COLUMN     "enddate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startdate" TIMESTAMP(3) NOT NULL;
