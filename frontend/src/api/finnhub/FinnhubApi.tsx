import fetchTickerSymbol from "./fetchTickerSymbol";
import { TradeDataProps } from "../../interfaces";

export default function finnhubApi(
  setTradeData: React.Dispatch<
    React.SetStateAction<TradeDataProps[] | undefined>
  >,
  tradeData: TradeDataProps[] | undefined
) {
  const key = process.env.FINNHUB_KEY;
  const socket = new WebSocket("wss://ws.finnhub.io?token=" + key);

  const subscriptionMessage = JSON.stringify({
    type: "subscribe",
    symbol: "BINANCE:BTCUSDT",
  });

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.data[0]) {
        const trade = data.data[0];
        const newTrade: TradeDataProps = {
          name: trade.s,
          price: trade.p,
          volume: trade.v,
        };
        setTradeData((prev) => [...(prev ?? []), newTrade]);
      }
    } catch (err) {
      return;
      // console.error(err);
    }
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
  });

  socket.addEventListener("open", () => {
    socket.send(subscriptionMessage);
  });
}
