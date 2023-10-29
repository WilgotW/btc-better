import jwt, { Secret } from "jsonwebtoken";

export default function getUserId(authKey: string) {
  const secret: string = process.env.SECRET_KEY || "";
  const decoded = jwt.verify(authKey, secret) as { userId: number };

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decoded.exp && currentTimestamp > decoded.exp) {
    console.log("JWT has expired");
  } else {
    console.log("JWT is still valid");
  }

  const userId = decoded.userId;
  return userId;
}
