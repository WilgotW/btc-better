import User from "../models/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class AuthService {
  async register(username: string, email: string, password: string) {
    try {
      const user = await prisma.users.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      return user;
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
