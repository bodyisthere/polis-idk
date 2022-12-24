import { Router } from 'express';

import { ConversationController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

export const conversationRoutes = new Router();

conversationRoutes.post("/conversation/:userId", checkAuth, ConversationController.createOrGetDialogue);
conversationRoutes.delete("/conversation/:dialogueId", checkAuth, ConversationController.deleteDialogue);
conversationRoutes.get("/conversation", checkAuth, ConversationController.getAllDialogues);
// conversationRoutes.post("/comment/:postId", checkAuth, ConversationController.create);
// conversationRoutes.delete("/comment/:commentId", checkAuth, ConversationController.remove);