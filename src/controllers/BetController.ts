
import  {Router, Request, Response} from "express";
import betService from '../services/BetService'

 class BetController{

    constructor() {
        //få prisma
    }
    public getRouter(){
        const router = Router();
        router.post("bet", ()=>{
            betService.setBet();
        })
        return router;
    }
 }