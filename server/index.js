//external libraies import
import express from "express";
import http from 'http'
import cors from "cors";
import multer from "multer";
import { instrument } from "@socket.io/admin-ui";


//inner methods
import { UserController, PostController, Universal } from "./controllers/index.js";
import { registrationValidation, loginValidation, postCreateValidation} from "./validations/validations.js";
import handleValidationErrors from "./validations/handleValidationErrors.js";
import checkAuth from "./utils/checkAuth.js";
import { dBConnect } from './DB/dBConnect.js'
import { storage } from './multer/multer.js'
import { createSocketIO } from './socket/socket.js'

//database connect
dBConnect()

//app logic
const app = express();
const server = http.createServer(app);

//socket
const io = createSocketIO(server);
instrument(io, { auth: false} );


//multer
const upload = multer({ storage });

//app additional things
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


//user methods
app.post("/auth/registration" ,registrationValidation, handleValidationErrors, UserController.registration);
app.post( "/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/token", checkAuth, UserController.loginWithToken);
app.post("/status-set", checkAuth, UserController.changeStatus);
app.put("/friend/:id", checkAuth, UserController.toggleFriend);
app.get("/page/:id", UserController.getOne);
app.get("/friend-search", UserController.searchUser);
app.get("/notifications", checkAuth, UserController.getNotifications)


//universal methods
app.post("/upload", checkAuth, upload.single("image"), Universal.upload);


//posts methods
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);

app.get('/post/:id', PostController.getPost);
app.put('/post/:id', checkAuth, PostController.toggleLike);
app.post('/post/:id', checkAuth, PostController.commentWrite);
app.delete('/post/:id', checkAuth, PostController.commentDelete);


//server start
server.listen(4444, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер: ${err}`);
  }
  console.log("Основной сервер запущен! :)");
});


