import { Server } from "socket.io";
import checkSocketAuth from "../utils/checkSocketAuth.js";
import UserModel from "../schemas/User.js";
import { SocketController } from "../controllers/index.js";


export function createSocketIO(server) {
    try {
        const io = new Server(server, {
            cors: {
              origin: ["http://localhost:3000", "https://admin.socket.io"],
              credentials: true
            }
        })
    
        io.use((socket, next) => {
            const token = socket.handshake.auth.authorization;
            checkSocketAuth(token, socket, next);
        })
    
        io.on('connection', async (socket) => {
            const id = socket.userId;
            const user = await UserModel.findById(id);
    
            console.log(`Новый юзер: ${user.fullName}`)
    
            socket.on('disconnect', (reason) => {
                console.log(`${user?.fullName} отключился`)
            })
    
            socket.on('like-send', (pId, likeCondition) => SocketController.likeSend(io, user, pId, likeCondition))

            socket.on('friend-add', (friendId, action) => SocketController.toggleFriend(io, user, friendId, action))

            socket.on('send-message', (message, friendId, action) => SocketController.sendMessage(io, user, message, friendId, action ))

            socket.on('get-all-messages', () => SocketController.getAllMessages(io, user))

            socket.on('get-one-dialogue', (conversationId) => SocketController.getOneDialogue(io, user, conversationId))

        })
          
    
        return io;
    } catch (error) {
        console.log(error)
    }
}

  