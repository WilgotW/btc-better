import express from "express";
import UserController from "./UserController";
import axios from "axios";
import cheerio from "cheerio";

const app = express();


app.get("/", (req, res: express.Response) => {
  res.send("home");
});

//routes
const userController = new UserController();
app.use(userController.routes());

app.listen(4000, () => console.log("live"));
