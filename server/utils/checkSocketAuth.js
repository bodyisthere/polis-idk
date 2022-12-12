import jwt from "jsonwebtoken";

export default (token, socket, next) => {
    if(!token) next(new Error("Ошибка валидации"))

    
    const decoded = jwt.verify(token, "secret123");
    socket.userId = decoded._id ? decoded._id : decoded.userId
    next();
};
