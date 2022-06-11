import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../../../../modules/posts/useCases/createPost/CreatePostController";

const postsRoutes = Router();

const createPostController = new CreatePostController();

postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

export { postsRoutes };
