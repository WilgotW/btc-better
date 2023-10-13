import { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";

const userRouter = Router();
const authController = new AuthController();

userRouter.post("/register", (req: Request, res: Response) => {
  const data = req.body;
  //   res.json(data);

  const username = data.username;
  const password = data.password;

  if (username && password) {
    const user = authController.register(username, password);
    res.json(user);
  } else {
    res.status(400).send("error");
  }
});

userRouter.get("/test", (req: Request, res: Response) => {
  res.send("hello");
});

userRouter.post("/login", (req: Request, res: Response) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;

  const user = authController.login(username, password);
  if (user) {
    res.json({ message: "Login succesful", user });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

export default userRouter;
