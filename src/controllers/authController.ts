import User from "../models/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class AuthController {
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

  async login(username: string, password: string) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username: username,
          password: password,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}
