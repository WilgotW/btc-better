/*
  Warnings:

  - The `profit` column on the `bets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "bets" DROP COLUMN "profit",
ADD COLUMN     "profit" DOUBLE PRECISION;
