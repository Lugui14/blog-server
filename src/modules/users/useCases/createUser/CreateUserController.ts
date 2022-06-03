import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUserUseCase = new CreateUserUseCase();

    const newUser = await createUserUseCase.execute({ name, email, password });

    return res.status(201).json(newUser);
  }
}

export { CreateUserController };
