import express from "express";
const app = express();

console.log("hello")

app.get("/", (req, res: express.Response) => {
    res.send("hehehehehehe");
});

app.listen(4000, () => console.log("started server"));