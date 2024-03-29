import addBalance from "./addBalance";

export default async function checkBets(currentPrice: number) {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return undefined;
  }

  try {
    const response = await fetch("http://localhost:4000/bet/check-bets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authKey,
      },
    });
    if (response.status === 200) {
      const data = await response.json();

      //for each bet ended: add balance
      data.forEach((bet: any) => {
        addBalance(bet, currentPrice);
      });

      console.log(data);
    } else {
      console.log("no bets");
    }
  } catch (err) {
    console.error(err);
  }
}
