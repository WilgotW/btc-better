import User from "../models/User";

export default class AuthController {
  private users: User[] = [];

  register(username: string, password: string) {
    if (this.users.some((user) => user.username == username)) {
      throw new Error("Username already taken");
    }

    const newUser = new User(this.users.length + 1, username, password);
    this.users.push(newUser);
    return newUser;
  }

  login(username: string, password: string): User | undefined {
    const user = this.users.find(
      (user) => user.username === username && user.password === password
    );
    return user;
  }
}
