import { Router } from 'express';

import { MessageController } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

export const messageRoutes = new Router();

messageRoutes.post("/message/:conversationId", checkAuth, MessageController.create);
messageRoutes.delete("/message/:messageId", checkAuth, MessageController.remove);
messageRoutes.get("/message/:messageId", checkAuth, MessageController.get);
messageRoutes.put("/message/:messageId", checkAuth, MessageController.edit);