import PrismaClient from "../../../shared/infra/prisma";
import { Post } from "@prisma/client";

import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IGetPostDTO } from "../dtos/IGetPostDTO";
import { IPostsRepository } from "./IPostsRepository";

export class PostsRepository implements IPostsRepository {
  private repo: typeof PrismaClient.post = PrismaClient.post;

  async findPostById(id: string): Promise<Post> {
    const post = await this.repo.findFirst({ where: { id: id } });
    return post;
  }

  async findLastPosts(page: number): Promise<Post[]> {
    const SKIP = page * 20;
    const posts = await this.repo.findMany({
      skip: SKIP,
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    return posts;
  }

  async createPost({ text, user_id }: ICreatePostDTO): Promise<IGetPostDTO> {
    const post = await this.repo.create({
      data: { text, userId: user_id },
      include: { user: true },
    });

    const formatedPost = {
      text: post.text,
      user: {
        name: post.user.name,
      },
    };

    return formatedPost;
  }
}
