import { Router } from 'express';

import { PostController } from '../controllers/index.js';
import { postCreateValidation } from "../validations/validations.js";
import handleValidationErrors from "../validations/handleValidationErrors.js";
import checkAuth from "../utils/checkAuth.js";

export const postRoutes = new Router();

postRoutes.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
postRoutes.delete("/posts/:id", checkAuth, PostController.remove);
postRoutes.get('/post/:id', PostController.getPost);
postRoutes.put('/post/:id', checkAuth, PostController.toggleLike);
postRoutes.post('/post/:id', checkAuth, PostController.commentWrite);
postRoutes.delete('/post/:id', checkAuth, PostController.commentDelete);