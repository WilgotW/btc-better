import User from "../models/User";
import { PrismaClient } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import getUserId from "../utils/getUserId";
import bcrypt from "bcrypt";

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
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
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
        },
      });
      if (user) {
        //compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const key: string = process.env.SECRET_KEY || "";
          const token = jwt.sign({ userId: user.id }, key, {
            expiresIn: "3h",
          });
          return { user, token };
        }
      }
      return undefined;
    } catch (err) {
      console.log(err);
      throw new Error("Login failed");
    }
  }

  async info(authKey: string) {
    try {
      const userId = getUserId(authKey);
      console.log("id: " + userId);

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
