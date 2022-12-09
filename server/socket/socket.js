import { Server } from "socket.io";
import checkSocketAuth from "../utils/checkSocketAuth.js";
import { User } from '../Classes/ClassUser.js'
import PostModel from "../schemas/Post.js";


export function createSocketIO(server) {
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
        const user = await new User(id).getById();
        
        console.log(`Новый юзер: ${user.fullName}`)

        socket.on('disconnect', (reason) => {
            console.log(`${user.fullName} отключился`)
        })

        socket.on('like-send', async (uId, pId, likeCondition) => {
            const post = await PostModel.findById(pId);
            const author = await new User(post.author).getById();
            let isOnline = false;
            let id;
            io.sockets.sockets.forEach(el => {
                if(post.author.toString() === el.userId) {
                    id = el.id;
                    isOnline = true;
                }
            })
            //если онлайн, то мы отправляем уведомление, а если нет, то мы просто записываем уведомление в бд
            if(isOnline && likeCondition === 'set like') {
                io.to(id).emit('liked!', {fullName: user.fullName, avatar: user.avatarUrl, id: user._id, post: pId, action: 'like'})
            } else if(likeCondition === 'delete like' && !isOnline) {
                author.notifications = author.notifications.filter(el => el.id.toString() !== user._id && pId !== el.post ? el : '')
                await author.save();
            } else if(likeCondition === 'set like' && !isOnline) {
                author.notifications = [...author.notifications, {fullName: user.fullName, avatar: user.avatarUrl, id: user._id, post: pId, action: 'like'}];
                await author.save()
            }
        })
    })
      

    return io;
}

  