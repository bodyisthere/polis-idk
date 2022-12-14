import PostModel from '../schemas/Post.js'
import { User } from '../Classes/ClassUser.js'
import UserModel from "../schemas/User.js";

const isUserOnline = async (io, searchId) => {
    let isOnline = false;
    let id;
    let idDB;
    io.sockets.sockets.forEach(el => {
        if(searchId.toString() === el.userId) {
            id = el.id;
            idDB = el.userId;
            isOnline = true;
        }
    })
    return {
        isOnline,
        id,
        idDB,
    }
}


export async function likeSend(io, user, pId, likeCondition) {
    try {
    const post = await PostModel.findById(pId);
    const author = await new User(post.author).getById();
    const { isOnline, id, idDB} = await isUserOnline(io, post.author)
    //{isOnline: true/false, id: ..., idDB: ...}

    const message = {
        fullName: user.fullName, 
        avatar: user.avatarUrl, 
        id: user._id, 
        post: pId, 
        postCover: post.cover,
        action: 'like'
    };

    //если онлайн, то мы отправляем уведомление, а если нет, то мы просто записываем уведомление в бд
    if(isOnline && likeCondition === 'set like') {
        console.log('send notification in online')
        if(user._id.toString() === idDB) return;
        io.to(id).emit('liked!', message)
    } else if(likeCondition === 'delete like' && !isOnline) {
        console.log('send notification for offline to delete')
        author.notifications = author.notifications.filter(el => {
            el.id.toString() !== user._id && pId !== el.post 
            ? el 
            : ''
        })
        await author.save();
    } else if(likeCondition === 'set like' && !isOnline) {
        console.log('send notification for offline to like')
        author.notifications = [...author.notifications, message];
        await author.save()
    }
    } catch (err) {
        console.log(err)
    }
}

export async function toggleFriend(io, user, friendId, action) {
    try {
        if(action === 'delete') return;
        const friend = await UserModel.findById(friendId);
        const { isOnline, id, idDB} = await isUserOnline(io, friend._id);

        const save = async () => {
            friend.notifications = [...friend.notifications, message];
            await friend.save();
        }

        const message = {
            fullName: user.fullName,
            id: user._id,
            avatar: user.avatarUrl,
            action: 'add-friend'
        }

        if(isOnline) {
            io.to(id).emit('add-friend', message);
        } else {
            if(!friend.notifications.length) {
                return save();
            };
            const isItUniqueNotification = friend.notifications.map(el => {
                if(el.id.toString() === user._id.toString() && el.action === 'add-friend') return true;
                return false;
            }).includes(true);
            
            if(!isItUniqueNotification) save()
        }
    } catch (err) {
        console.log(err)
    }
}

export async function sendMessage(io, user, message, friendId, action) {
    try {
        const friend = await UserModel.findById(friendId);
        console.log(io.socket.sockets)

    } catch (err) {
        console.log(err)
    }
}