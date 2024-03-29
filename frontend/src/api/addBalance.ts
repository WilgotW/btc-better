import fetchEndPrice from "./finnhub/fetchEndPrice";

export default async function addBalance(betData: any, currentPrice: number) {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return undefined;
  }

  try {
    // const newValue = await fetchEndPrice(
    //   betData.startdate - 20000,
    //   betData.enddate - 10
    // );
    // if (!newValue) return;
    // console.log("the new value: " + newValue.c[0]);
    // console.log(betData.startdate, betData.enddate);
    const requestBody = {
      betId: betData.id,
      newValue: currentPrice,
      startValue: betData.startvalue,
      amount: betData.amount,
    };

    const response = await fetch("http://localhost:4000/bet/add-balance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authKey,
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      const updatedUser = await response.json();
      console.log(updatedUser);
      // window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}
