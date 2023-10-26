import { PrismaClient } from "@prisma/client";
import Bet from "../models/Bet";

const prisma = new PrismaClient();

export default class BetController {
  async newBet(betData: Bet) {
    try {
      const betStartTimeStamp = Math.floor(betData.startDate.getTime() / 1000);
      const betEndTimeStamp = Math.floor(betData.endDate.getTime() / 1000);

      const newBet = prisma.bets.create({
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
}
