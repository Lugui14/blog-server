import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const user = await authenticateUserUseCase.execute({ email, password });

    return res.json(user);
  }
}

export { AuthenticateUserController };
