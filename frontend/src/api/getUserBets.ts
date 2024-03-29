import checkStatus from "./checkStatus";

export default async function getUserBets() {
  const authKey = localStorage.getItem("authorization");
  if (!authKey) {
    console.error("no key found");
    return undefined;
  }

  try {
    const response = await fetch("http://localhost:4000/bet/get-all", {
      method: "GET",
      headers: {
        authorization: authKey,
      },
    });
    if (checkStatus(response.status)) {
      const data = await response.json();
      return await data;
    }
  } catch (err) {
    console.error(err);

    return undefined;
  }
}
