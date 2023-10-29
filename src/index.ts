import express from "express";
import userRouter from "./routes/userRoutes";
import betRouter from "./routes/betRoutes";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/bet", betRouter);

app.listen(4000, () => console.log("Server is running on port 4000"));
