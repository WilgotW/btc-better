import React from "react";

interface IProps {
  from: number;
  to: number;
}

export default async function fetchEndPrice(from: number, to: number) {
  const key = process.env.FINNHUB_KEY;
  const response = await fetch(
    `https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=1&from=${from}&to=${to}&token=${key}`
  );
  const data = await response.json();
  console.log(await data);
  return await data;
}
