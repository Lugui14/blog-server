import { Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import prismaClient from "shared/infra/prisma";

import { AppError } from "./../../../errors/AppError";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (req: Request, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Token is missing.", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_ACCESS_TOKEN
    ) as IPayload;

    const user = await prismaClient.user.findFirst({ where: { id: user_id } });

    if (!user) throw new AppError("User not found.");

    req.user = { id: user_id };

    next();
  } catch {
    throw new AppError("Invalid Token.", 401);
  }
};
