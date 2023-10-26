import { PrismaClient } from "@prisma/client";
import Bet from "../models/Bet";

const prisma = new PrismaClient();

export default class BetController {
  async newBet(betData: Bet) {
    try {
      const betStartTimeStamp = Math.floor(betData.startDate.getTime() / 1000);
      const betEndTimeStamp = Math.floor(
        (betData.endDate.getTime() + 60000) / 1000
      );

      const newBet = await prisma.bets.create({
        data: {
          userid: betData.userId,
          ticker: betData.ticker,
          startdate: betStartTimeStamp,
          enddate: betEndTimeStamp,
          amount: betData.amount,
        },
      });
      return newBet;
    } catch (err) {
      throw new Error("error");
    }
  }

  async allBets(userId: number) {
    const userBets = await prisma.bets.findMany({
      where: {
        userid: userId,
      },
    });
    return userBets;
  }

  async checkBetsEnd(userId: number) {
    const userBets = await prisma.bets.findMany({
      where: {
        userid: userId,
      },
    });

    const date = new Date();
    const currentTimestamp = Math.floor(date.getTime() / 1000);

    const betsDone = userBets.filter((bet) => {
      //check if bet is done
      if (bet.enddate <= currentTimestamp) {
        return bet;
      }
    });
    return betsDone;
  }
}
