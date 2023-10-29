import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  if (!token) {
    console.log("e");
    return res.sendStatus(401);
  }
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
