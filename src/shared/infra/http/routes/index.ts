import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { postsRoutes } from "./posts.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/authenticate", authenticateRoutes);
router.use("/posts", postsRoutes);

export default router;
