import User from "../models/User";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

const prisma = new PrismaClient();
dotenv.config();

export default class UserController {
  async register(username: string, email: string, password: string) {
    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        const user = await prisma.users.create({
          data: {
            username: username,
            email: email,
            password: password,
            balance: 10000,
          },
        });

        return user;
      }
      return undefined;
    } catch (err) {
      console.log(err);
      throw new Error("Registration failed");
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
          password: password,
        },
      });
      if (user) {
        const key: string = process.env.SECRET_KEY || "";
        const token = jwt.sign({ userId: user.id }, key, {
          expiresIn: "1h",
        });
        return { user, token };
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async info(authKey: string) {
    try {
      const key: string = process.env.SECRET_KEY || "";
      const decoded = jwt.verify(authKey, key) as { userId: number };
      const userId = decoded.userId;

      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        return user;
      }
    } catch (err) {
      console.error(err);
      throw new Error("failed to retrieve user info");
    }
  }
}
