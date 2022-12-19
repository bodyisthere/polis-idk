import express from "express";
import http from 'http'
import cors from "cors";
import { instrument } from "@socket.io/admin-ui";

import { dBConnect } from './DB/dBConnect.js'
import { createSocketIO } from './socket/socket.js'
import { userRoutes, postRoutes, universalRoutes } from "./routes/index.js"

dBConnect()

const app = express();
const server = http.createServer(app);

//socket
const io = createSocketIO(server);
instrument(io, { auth: false} );


//app additional things
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


app.use(userRoutes);
app.use(universalRoutes);
app.use(postRoutes);


// app.post('/conversation/:guestId', checkAuth, MessageController.createDialogue);
// app.get('/conversation/:id', checkAuth, MessageController.getDialogue);
// app.delete('/conversation/:id', checkAuth, MessageController.deleteDialogue);
// app.get('/conversation', checkAuth, MessageController.getAllDialogues);


//server start
server.listen(4444, (err) => {
  if (err) {
    return console.log(`Не удалось запустить сервер: ${err}`);
  }
  console.log("Основной сервер запущен! :)");
});


