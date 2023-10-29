import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import verifyToken from "../middleware/veryfyToken";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", async (req: Request, res: Response) => {
  const data = req.body;

  const username = data.username;
  const email = data.email;
  const password = data.password;

  console.log(data);

  if (username && password && email) {
    const user = await userController.register(username, email, password);
    if (user) {
      res.json(user);
    } else {
      res.send("user already exist");
    }
  } else {
    res.status(400).send("error");
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const data = req.body;
  const email = data.email;
  const password = data.password;

  const user = await userController.login(email, password);
  if (user) {
    res.json({ message: "Login succesful", user });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

userRouter.get("/info", async (req: Request, res: Response) => {
  const key = req.get("key") || "";

  const user = await userController.info(key);
  if (user) {
    res.json(user);
  }
});

export default userRouter;
