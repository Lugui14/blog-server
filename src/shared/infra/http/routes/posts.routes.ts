import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../../../../modules/posts/useCases/createPost/CreatePostController";
import { GetPostsController } from "../../../../modules/posts/useCases/getPosts/GetPostsController";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const getPostsController = new GetPostsController();

postsRoutes.get("/", getPostsController.handle);
postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

export { postsRoutes };
