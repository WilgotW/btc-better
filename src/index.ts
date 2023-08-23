import express from "express";
import UserController from './UserController';

const app = express();

console.log("hello")

app.get("/", (req, res: express.Response) => {
    res.send("home");
});


//routes
const userController = new UserController();
app.use(userController.routes());

app.listen(4000, () => console.log("started server"));