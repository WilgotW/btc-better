import express, { Router } from "express";

export default class UserController {
    constructor(){

    }

    routes() {
        const router: Router = express.Router();

        router.post("/register", (req, res) => {

        })
        router.post("login", (req, res) => {

        })

        return router;
    }
    
}