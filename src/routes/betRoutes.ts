import { Router, Response, Request } from "express";
import Bet from "../models/Bet";
import BetController from "../controllers/betController";

const betRouter = Router();
const betController = new BetController();

betRouter.post("/create", async (req: Request, res: Response) => {
  //create new bet
  const data = req.body;
  if (data) {
    try {
      const betStart = new Date();
      const betEnd = new Date();

      const newBet = await betController.newBet({
        userId: data.userId,
        ticker: data.ticker,
        startDate: betStart,
        endDate: betEnd,
        amount: data.amount,
      });
      if (newBet) {
        res.json(newBet);
      } else {
        res.status(400).send("couldn't create bet");
      }
    } catch (err) {
      throw new Error("error accessing data");
    }
  }
});

export default betRouter;
