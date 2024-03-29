import React from "react";

export default async function fetchTickerSymbol() {
  const key = process.env.FINNHUB_KEY;
  const query = "btc";

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/search?q=${query}&token=${key}`
    );
    const data = await response.json();
    // console.log(data);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors here
  }
}
