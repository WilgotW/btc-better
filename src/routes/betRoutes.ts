import { Router, Response, Request } from "express";
import BetController from "../controllers/BetController";
import verifyToken from "../middleware/veryfyToken";

const betRouter = Router();
const betController = new BetController();

betRouter.post("/create", verifyToken, async (req: Request, res: Response) => {
  const data = req.body;
  if (!data) return;

  const key = req.get("authorization") || "";
  console.log(data);
  try {
    const betStart = new Date();
    const betEnd = new Date();

    const newBet = await betController.newBet(
      {
        userId: data.userId,
        ticker: data.ticker,
        startDate: betStart,
        endDate: betEnd,
        duration: data.duration,
        amount: data.amount,
        startValue: data.startValue,
      },
      key
    );
    if (newBet) {
      res.json(newBet);
    } else {
      res.status(400).send("couldn't create bet");
    }
  } catch (err) {
    throw new Error("error accessing bet data");
  }
});

betRouter.get("/get-all", verifyToken, async (req: Request, res: Response) => {
  const key = req.get("authorization") || "";
  try {
    const allBets = await betController.allBets(key);
    if (allBets.length) {
      res.json(allBets);
    } else {
      res.send("no bets");
    }
  } catch (err) {
    throw new Error("error accessing bet data");
  }
});

betRouter.get(
  "/check-bets",
  verifyToken,
  async (req: Request, res: Response) => {
    const key = req.get("key") || "";

    try {
      const doneBets = await betController.checkBetsEnd(key);
      if (doneBets.length) {
        res.json(doneBets);
      } else {
        res.send("no bets have ended");
      }
    } catch (err) {
      throw new Error("error accessing bet data");
    }
  }
);

export default betRouter;
