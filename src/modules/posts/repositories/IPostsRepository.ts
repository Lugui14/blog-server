import { Post } from "@prisma/client";

import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IGetPostDTO } from "../dtos/IGetPostDTO";

export interface IPostsRepository {
  findPostById(id: string): Promise<Post>;
  findLastPosts(page: number): Promise<Post[]>;
  createPost({ text, user_id }: ICreatePostDTO): Promise<IGetPostDTO>;
}
