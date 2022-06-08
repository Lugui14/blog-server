import { hash } from "bcrypt";
import { User } from "@prisma/client";

import { AppError } from "./../../../../shared/errors/AppError";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "./../../repositories/IUsersRepository";
import { UsersRepository } from "./../../repositories/UsersRepository";

class CreateUserUseCase {
  private repo: IUsersRepository = new UsersRepository();

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.repo.findByEmail(email);

    if (userAlreadyExists) throw new AppError("User Already Exists.");

    const pwdHash = await hash(password, 8);

    await this.repo.newUser({ name, email, password: pwdHash });
  }
}

export { CreateUserUseCase };
