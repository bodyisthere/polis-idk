import { Router } from 'express';

import { ConversationController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

export const conversationRoutes = new Router();

conversationRoutes.post("/conversation/:id", checkAuth, ConversationController.createOrGetDialogue);
// conversationRoutes.put("/comment/:commentId", checkAuth, ConversationController.edit);
// conversationRoutes.post("/comment/:postId", checkAuth, ConversationController.create);
// conversationRoutes.delete("/comment/:commentId", checkAuth, ConversationController.remove);