import { io } from "socket.io-client";

export async function connection(isAuth, socket, setNotifications, setIsConnected, setMessages) {
    if(!isAuth && socket.current) return;

    setIsConnected(true);

    socket.current = io('http://localhost:4444', {
        auth: {authorization: localStorage.getItem('token')}
    })

    socket.current.on('liked!', (x) => {
        setNotifications(prev => [...prev, x])
    })
  
    socket.current.on('send-all-messages', (messages) => {
        setMessages(messages);
    })
  
    socket.current.on('add-friend', (x) => {
        setNotifications(prev => [...prev, x])
    })
  
    socket.current.on('disconnect', () => {
        setIsConnected(false);
    }) 
}

export function like(postId, likeCondition, socket) {
    socket.current.emit('like-send', postId, likeCondition)
}
  
export function toggleFriend(friendId, action, socket) {
    socket.current.emit('friend-add', friendId, action)
}
  
export function getAllMessages(socket) {
    socket.current.emit('get-all-messages')
}
  
export function getOneDialogue(socket, conversationId) {
    socket.current.emit('get-one-dialogue', conversationId)
}