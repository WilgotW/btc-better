/*
  Warnings:

  - Changed the type of `enddate` on the `bets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startdate` on the `bets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "bets" DROP COLUMN "enddate",
ADD COLUMN     "enddate" INTEGER NOT NULL,
DROP COLUMN "startdate",
ADD COLUMN     "startdate" INTEGER NOT NULL;
