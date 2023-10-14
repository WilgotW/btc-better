import { Router, Request, Response } from "express";
import AuthController from "../controllers/authController";

const userRouter = Router();
const authController = new AuthController();

userRouter.post("/register", async (req: Request, res: Response) => {
  const data = req.body;
  //   res.json(data);

  const username = data.username;
  const email = data.email;
  const password = data.password;

  console.log(data);

  if (username && password && email) {
    const user = await authController.register(username, email, password);
    res.json(user);
  } else {
    res.status(400).send("error");
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;

  const user = await authController.login(username, password);
  if (user) {
    res.json({ message: "Login succesful", user });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

export default userRouter;
