import { Post } from "@prisma/client";

import { PostsRepository } from "./../../repositories/PostsRepository";
import { IPostsRepository } from "./../../repositories/IPostsRepository";

class GetPostsUseCase {
  private repo: IPostsRepository = new PostsRepository();

  async execute(page: number, filter: string): Promise<Post[]> {
    const posts = await this.repo.findLastPosts(page, filter);

    return posts;
  }
}

export { GetPostsUseCase };
