import { PrismaClient } from "@prisma/client";
import Bet from "../models/Bet";
import getUserId from "../utils/getUserId";

const prisma = new PrismaClient();

export default class BetController {
  async newBet(betData: Bet, authKey: string) {
    const userId = getUserId(authKey);
    try {
      const user = await prisma.users.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("error getting user");
      }
      const updatedBalance = user.balance - betData.amount;

      if (updatedBalance < 0) {
        throw new Error("insufficient balance");
      }

      const betStartTimeStamp = Math.floor(betData.startDate.getTime() / 1000);
      //minutes: n * 60 * 1000 (change to hour)
      const fromNow = betData.duration * 60 * 1000 * 0.1; // remove 0.1
      const betEndTimeStamp = Math.floor(
        (betData.endDate.getTime() + fromNow) / 1000
      );

      const newBet = await prisma.bets.create({
        data: {
          userid: userId,
          ticker: betData.ticker,
          startdate: betStartTimeStamp,
          enddate: betEndTimeStamp,
          duration: betData.duration,
          amount: betData.amount,
          startvalue: betData.startValue,
        },
      });

      await prisma.users.update({
        where: { id: userId },
        data: {
          balance: updatedBalance,
        },
      });

      return newBet;
    } catch (err) {
      throw new Error("error creating new bet");
    }
  }

  async allBets(authKey: string) {
    const userId = getUserId(authKey);

    const userBets = await prisma.bets.findMany({
      where: {
        userid: userId,
      },
    });
    return userBets;
  }

  async checkBetsEnd(authKey: string) {
    const userId = getUserId(authKey);

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
        //set done to true
        if (!bet.done) {
          this.setToDone(bet.id);
          return bet;
        }
      }
    });
    return betsDone;
  }

  async setToDone(betId: number) {
    await prisma.bets.update({
      where: { id: betId },
      data: {
        done: true,
      },
    });
  }
  async addBalance(authKey: string, amount: number) {
    const userId = getUserId(authKey);

    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (user) {
      const newAmount = user.balance + amount;
      console.log(newAmount);
      console.log(user.balance);
      await prisma.users.update({
        where: { id: userId },
        data: {
          balance: newAmount,
        },
      });
      return user;
    } else {
      throw new Error("user not found");
    }
  }
}
