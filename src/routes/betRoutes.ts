import { Router, Response, Request } from "express";
import BetController from "../controllers/betController";

const betRouter = Router();
const betController = new BetController();

betRouter.post("/create", async (req: Request, res: Response) => {
  const data = req.body;
  if (!data) return;
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
    throw new Error("error accessing bet data");
  }
});

betRouter.post("/get-all", async (req: Request, res: Response) => {
  const id: number = req.body.userId;
  if (!id) res.status(400).send("no id found");

  try {
    const allBets = await betController.allBets(id);
    if (allBets.length) {
      res.json(allBets);
    } else {
      res.send("no bets");
    }
  } catch (err) {
    throw new Error("error accessing bet data");
  }
});

betRouter.post("/check-bets", async (req: Request, res: Response) => {
  const id: number = req.body.userId;
  if (!id) res.status(400).send("no id found");

  try {
    const doneBets = await betController.checkBetsEnd(id);
    if (doneBets.length) {
      res.json(doneBets);
    } else {
      res.send("no bets have ended");
    }
  } catch (err) {
    throw new Error("error accessing bet data");
  }
});

export default betRouter;
