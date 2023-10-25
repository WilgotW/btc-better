
import { Router, Response, Request } from "express"
import Bet from "../models/Bet";
import betController from "../controllers/betController";

const betRouter = Router();

betRouter.post("/create", async (req: Request, res: Response) => {
    //create new bet
    const data = req.body;
    if(data){
        try{
            const newBet: Bet = await betController.createBet({
                userId: data.userId,
                ticker: data.ticker,
                startDate: data.startDate,
                endDate: data.endDate,
                amount: data.amount,
            }
            );
        }catch(err){
            throw new Error("error");
        }



    }


})

export {betRouter}