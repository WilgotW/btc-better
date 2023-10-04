import express, { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { error } from "console";

export default class UserController {
    constructor(){

    }

    routes() {
        const router: Router = express.Router();

        router.post("/register", (req, res) => {
            const email = req.body.email;
            const password = req.body.password;

            const user ={
                email,
                passwordHash : bcrypt.hash(password, 10)
            }


        })
        router.post("login", (req, res) => {
            const email = req.body.email;
            const password = req.body.password;
            // prisma get user

            // if(!bcrypt.compare(password, user.passwrodHash)){
                throw error("incident")
            // }

            const token = jwt.sign({}, "secret")

            return token;


        })

        return router;
    }
    
}