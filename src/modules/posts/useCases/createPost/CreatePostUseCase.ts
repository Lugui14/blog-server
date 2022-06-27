import { AppError } from "./../../../../shared/errors/AppError";

import { IPostsRepository } from "../../repositories/IPostsRepository";
import { PostsRepository } from "./../../repositories/PostsRepository";
import { ICreatePostDTO } from "./../../dtos/ICreatePostDTO";
import { IGetPostDTO } from "./../../dtos/IGetPostDTO";
import { io } from "../../../../shared/infra/http/server";

export class CreatePostUseCase {
  private repo: IPostsRepository = new PostsRepository();

  async execute({ text, user_id }: ICreatePostDTO): Promise<IGetPostDTO> {
    if (text.length > 255)
      throw new AppError("Digite um texto de no maximo 255 caracteres.", 401);

    const post = await this.repo.createPost({ text, user_id });
    io.emit("new_message", post);

    return post;
  }
}
