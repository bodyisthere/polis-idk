import { Router } from 'express';

import { CommentController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

export const commentRoutes = new Router();

commentRoutes.get("/comment/:commentId", checkAuth, CommentController.get);
commentRoutes.put("/comment/:commentId", checkAuth, CommentController.edit);
commentRoutes.post("/comment/:postId", checkAuth, CommentController.create);
commentRoutes.delete("/comment/:commentId", checkAuth, CommentController.remove);