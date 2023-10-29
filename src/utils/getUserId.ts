import jwt, { Secret } from "jsonwebtoken";

export default function getUserId(authKey: string) {
  const key: string = process.env.SECRET_KEY || "";
  const decoded = jwt.verify(authKey, key) as { userId: number };
  const userId = decoded.userId;
  return userId;
}
