import { Request, Response } from "express";
import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { text } = req.body;
    const { id: user_id } = req.user;

    const createPostUseCase = new CreatePostUseCase();
    const post = await createPostUseCase.execute({ text, user_id });

    return res.json(post);
  }
}
