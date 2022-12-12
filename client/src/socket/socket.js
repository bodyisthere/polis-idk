import { io } from 'socket.io-client'

export function socketConnection(isAuth, socket, setNotifications) {
    if(!isAuth && socket.current) return;

    socket.current = io('http://localhost:4444', {
      auth: {authorization: localStorage.getItem('token')}
    })

    socket.current.on('liked!', (x) => {
      setNotifications(prev => [...prev, x])
    })

    socket.current.on('add-friend', (x) => {
      setNotifications(prev => [...prev, x])
    })
}

export function like(postId, likeCondition, socket) {
  socket.current.emit('like-send', postId, likeCondition)
}

export function toggleFriendSocket(friendId, action, socket) {
  socket.current.emit('friend-add', friendId, action)
}