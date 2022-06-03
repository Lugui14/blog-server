import { hash } from "bcrypt";

import { AppError } from "shared/errors/AppError";

import { IUsersRepository } from "modules/users/repositories/IUsersRepository";

import { User } from "@prisma/client";
import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("User Already Exists.");

    const pwdHash = await hash(password, 8);

    const user = await this.usersRepository.create({ name, email, password });

    return user;
  }
}
