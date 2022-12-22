import { UserService } from '../services/index.js'
import { handleError } from '../utils/handleError.js';

export const registration = async (req, res) => {
    try {
        const user = await UserService.registration(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось зарегистрироваться");
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserService.login(req.body);
        res.json(user);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось авторизоваться");
    }
}

export const loginWithToken = async (req, res) => {
    try {
        const user = await UserService.loginWithToken(req.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось авторизоваться");
    }
}

export const getOne = async (req, res) => {
    try {
        const user = await UserService.getOne(req.params.id);
        res.json(user);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось получить пользователя");
    }
}

export const toggleFriend = async (req, res) => {
    try {
        const myId = req.userId;
        const friendId = req.params.id;

        const action = await UserService.toggleFriend(myId, friendId);
        res.json(action);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось добавить в друзья");
    }
}

export const changeStatus = async (req, res) => {
    try {
        const message = await UserService.changeStatus(req.userId, req.body.status);
        res.json(message);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось изменить статус");
    }
}

export const searchUser = async (req, res) => {
    try {
        const searchName = req.query.name;
        //response может включать, как список найденных юзеров,
        //так и сообщение о их не нахождении
        const response = await UserService.searchUser(searchName);
        
        res.json(response);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось совершить запрос на поиск");
    }
}

export const getNotifications = async (req, res) => {
    try {
        const notifications = await UserService.getNotifications(req.userId);

        res.json(notifications)
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось получить уведомления");
    }
}