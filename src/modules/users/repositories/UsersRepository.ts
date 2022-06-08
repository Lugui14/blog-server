import prismaClient from "../../../shared/infra/prisma";
import { User } from "@prisma/client";

import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repo: typeof prismaClient.user = prismaClient.user;

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findFirst({
      where: { email: email },
    });

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repo.findFirst({
      where: { id: id },
    });

    return user;
  }

  async newUser({ name, email, password }): Promise<void> {
    await this.repo.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
