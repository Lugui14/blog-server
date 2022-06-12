import { Request, Response } from "express";

import { GetPostsUseCase } from "./GetPostsUseCase";

interface IRequest {
  page: number;
}

class GetPostsController {
  async handle(
    req: Request<{}, {}, {}, IRequest>,
    res: Response
  ): Promise<Response> {
    const { page } = req.query;
    const getPostsUseCase = new GetPostsUseCase();

    const posts = await getPostsUseCase.execute(page || 0);

    return res.json(posts);
  }
}

export { GetPostsController };
