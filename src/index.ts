import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import userRouter from "./routes/userRoutes";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res: express.Response) => {
  res.send("home");
});

// Routes
app.use("/user", userRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));
