import { Router } from 'express';

import { UserController } from '../controllers/index.js';
import { registrationValidation, loginValidation } from "../validations/validations.js";
import handleValidationErrors from "../validations/handleValidationErrors.js";
import checkAuth from "../utils/checkAuth.js";

export const userRoutes = new Router();

userRoutes.post("/auth/registration" ,registrationValidation, handleValidationErrors, UserController.registration);
userRoutes.post( "/auth/login", loginValidation, handleValidationErrors, UserController.login);
userRoutes.post("/auth/token", checkAuth, UserController.loginWithToken);
userRoutes.post("/status-set", checkAuth, UserController.changeStatus);
userRoutes.put("/friend/:id", checkAuth, UserController.toggleFriend);
userRoutes.get("/page/:id", UserController.getOne);
userRoutes.get("/friend-search", UserController.searchUser);
userRoutes.get("/notifications", checkAuth, UserController.getNotifications)