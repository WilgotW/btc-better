import { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";

const userRouter = Router();
const authController = new AuthController();

userRouter.post("/register", (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const user = authController.register(userName, password);
  res.json(user);
});

userRouter.post("/login", (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const user = authController.login(userName, password);
  if (user) {
    res.json({ message: "Login succesful", user });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

export default userRouter;
