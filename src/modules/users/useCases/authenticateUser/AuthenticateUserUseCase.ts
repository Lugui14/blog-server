import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AppError } from "./../../../../shared/errors/AppError";

import { UsersRepository } from "./../../repositories/UsersRepository";
import { IUsersRepository } from "./../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

class AuthenticateUserUseCase {
  private repo: IUsersRepository = new UsersRepository();

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new AppError("Email or password incorrect.");

    const pwdMatch = await compare(password, user.password);
    if (!pwdMatch) throw new AppError("Email or password incorrect.");

    const token = sign({}, process.env.JWT_ACCESS_TOKEN, {
      subject: user.id,
      expiresIn: "2h",
    });

    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase };
