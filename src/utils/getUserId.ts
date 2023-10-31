import jwt, { Secret } from "jsonwebtoken";
import isExpired from "./isExpired";

export default function getUserId(authKey: string) {
  const secret: string = process.env.SECRET_KEY || "";
  const decoded = jwt.verify(authKey, secret) as { userId: number };

  return decoded.userId;
}
