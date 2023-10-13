import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import userRouter from "./routes/userRoutes";

const app = express();

app.get("/", (req, res: express.Response) => {
  res.send("home");
});

//routes
app.use("/user", userRouter);

app.listen(4000, () => console.log("live"));
