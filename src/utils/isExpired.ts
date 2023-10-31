import jwt from "jsonwebtoken";

export default function isExpired(token: string) {
  console.log("the token: " + token);
  const decoded = jwt.decode(token, { complete: true });
  if (decoded) {
    const payload = decoded.payload as { exp: number };
    if (payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = payload.exp;

      if (currentTime > expirationTime) {
        return true;
      }
      return false;
    }
  } else {
    console.log("invalid token");
    return true;
  }
}
