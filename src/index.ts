import express from "express";
import UserController from "./UserController";
import axios from "axios";
import cheerio from "cheerio";

const app = express();

console.log("hello");

app.get("/", (req, res: express.Response) => {
  res.send("home");
});

async function scrapePrice() {
  const url = "https://www.bullionbypost.eu/gold-price/live-gold-price/";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const priceElement = $(
      'span[name="current_price_field"][data-currency="default"]'
    );
    const priceText = priceElement.text();

    console.log("Scraped Price:", priceText.trim());
  } catch (error) {
    console.error("Error:", error);
  }
}

//routes
const userController = new UserController();
app.use(userController.routes());

app.listen(4000, () => scrapePrice());
