import { Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "./../../../errors/AppError";

import { IUsersRepository } from "./../../../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "./../../../../modules/users/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (req: Request, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token is missing.", 401);

  const repo: IUsersRepository = new UsersRepository();
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_ACCESS_TOKEN
    ) as IPayload;

    const user = await repo.findById(user_id);

    if (!user) throw new AppError("User not found.");

    req.user = { id: user_id };

    next();
  } catch {
    throw new AppError("Invalid Token.", 401);
  }
};
