-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "bet_start" TIMESTAMP(3) NOT NULL,
    "bet_end" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);
