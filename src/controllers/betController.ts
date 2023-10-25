import { PrismaClient } from "@prisma/client";
import Bet from "../models/Bet";

const prisma = new PrismaClient();

export default class betController{
    async newBet(betData: Bet){
        
    }
}