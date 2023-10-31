import jwt, { Secret } from "jsonwebtoken";
import isExpired from "./isExpired";

export default function getUserId(authKey: string) {
  if (!isExpired(authKey)) {
    const secret: string = process.env.SECRET_KEY || "";
    const decoded = jwt.verify(authKey, secret) as { userId: number };

    const userId = decoded.userId;
    return userId;
  } else {
    console.log("token expired");
  }
}
