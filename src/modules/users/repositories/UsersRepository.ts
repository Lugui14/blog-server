import prismaClient from "shared/infra/prisma";
import { User } from "@prisma/client";

import { IUsersRepository } from "./IUsersRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    return user;
  }
}
