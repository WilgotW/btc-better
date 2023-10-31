import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import isExpired from "../utils/isExpired";

const prisma = new PrismaClient();
dotenv.config();

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string = req.headers.authorization || "";
  console.log("ja: " + token);
  console.log(isExpired(token));
  if (!token) {
    return res.sendStatus(401);
  }
  // if (isExpired(token)) {
  //   return res.send("jwt expired");
  // }

  const key = process.env.SECRET_KEY;
  jwt.verify(token, key as Secret, async (err, decoded: any) => {
    if (err) {
      //forbidden
      return res.status(403).send("user auth problem");
    }

    console.log(decoded);

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      res.status(401).send("Not verified");
    }

    (req as any).user = user;

    next();
  });
}
