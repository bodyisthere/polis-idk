//external libraies import
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import fs from "fs";

//inner methods
import { UserController, PostController, Universal } from "./controllers/index.js";
import { registrationValidation, loginValidation, postCreateValidation} from "./validations/validations.js";
import handleValidationErrors from "./validations/handleValidationErrors.js";
import checkAuth from "./utils/checkAuth.js";

// "mongodb+srv://admin:wwwwww@cluster0.cvi7gkx.mongodb.net/policy?retryWrites=true&w=majority"
//database connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("БД подключена! :)"))
  .catch((err) => console.log("Ошибка базы данных: ", err));

//app logic
const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
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
app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер: ${err}`);
  }

  console.log("Сервер запущен! :)");
});
// app.listen(4444, (err) => {
//   if (err) {
//     return console.log(`Не удалось запустить сервер: ${err}`);
//   }

//   console.log("Сервер запущен! :)");
// });
