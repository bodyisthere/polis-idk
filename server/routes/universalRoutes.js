import { Router } from 'express';
import multer from "multer";

import { storage } from '../multer/multer.js'
import { Universal } from '../controllers/index.js';
import checkAuth from "../utils/checkAuth.js";

export const universalRoutes = new Router();

const upload = multer({ storage });
universalRoutes.post("/upload", checkAuth, upload.single("image"), Universal.upload);