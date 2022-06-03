import { hash } from "bcrypt";
import { User } from "@prisma/client";

import prismaClient from "../../../../shared/infra/prisma";
import { AppError } from "./../../../../shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class CreateUserUseCase {
  constructor(private repo = prismaClient.user) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.repo.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) throw new AppError("User Already Exists.");

    const pwdHash = await hash(password, 8);

    const user = await this.repo.create({
      data: {
        name,
        email,
        password: pwdHash,
      },
    });

    return user;
  }
}

export { CreateUserUseCase };
