import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../schemas/User.js";

const getUserFriends = async (friendList) => {
    if(!friendList.length) return [];

    let i = 0;
    let friends = [];
    while(friendList.length > i) {
        const friend = await UserModel.findById(friendList[i], {
            _id: 1,
            fullName: 1,
            avatarUrl: 1,
        })
        friends.push(friend);
        i += 1;
    }
    return friends;
}

const isTheyFriend = async (friendsArray, friendId) => {
    let answer = true;
    let index = 0;

    while(answer && index < friendsArray.length) {
        if(friendsArray[index] === friendId) answer = false;
        index += 1;
    }
    return answer;
}

export const registration = async (body) => {
    const isUnique = await UserModel.findOne({ email: body.email });

    if(isUnique) {
        throw new Error('Пользователь с таким email уже существует!') 
    };

    const password = body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        fullName: body.fullName,
        email: body.email,
        passwordHash: hash,
        avatarUrl: body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign({ userId: user._id }, "secret123", {
        expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    return {
        token,
        ...userData
    }
}

export const login = async (body) => {
    const user = await UserModel.findOne({  email: body.email });
    if(!user) throw new Error("Пользователь не найден");

    const isValidPass = await bcrypt.compare(
        body.password,
        user._doc.passwordHash
    );
    if(!isValidPass) throw new Error("Неверный логин или пароль");

    const token = jwt.sign(
        { _id: user._id }, "secret123",{ expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    return ({
        token,
        ...userData
    })
}

export const loginWithToken = async (token) => {
    const user = await UserModel.findById(token);
    const friends = await getUserFriends(user.friendList);

    const { passwordHash, email, ...userData } = user._doc;
    userData.friendList = friends;

    return ({ ...userData })
}

export const getOne = async (id) => {
    const user = await UserModel.findById(id);
    const friends = await getUserFriends(user.friendList);

    const { passwordHash, email, ...userData } = user._doc;
    userData.friendList = friends;

    return ({ ...userData })
}

export const toggleFriend = async (myId, friendId) => {
    let action = "";
    let me = await UserModel.findById(myId);
    let friend = await UserModel.findById(friendId);

    if(await isTheyFriend(me.friendList, friendId)) {
        action = "Вы добавили этого человека в друзья";
        me.friendList = [...me.friendList, friendId];
        friend.friendList = [...friend.friendList, myId];
    } else {
        action = "Вы удалили этого человека из друзей";
        me.friendList = me.friendList.filter(el => el !== friendId);
        friend.friendList = friend.friendList.filter(el => el !== myId);
    }

    await me.save();
    await friend.save();

    return ({message: action})
}

export const changeStatus = async (id, status) => {
    const user = await UserModel.findById(id);
    user.status = status;

    await user.save();

    return ({message: "Статус успешно изменён!"});
}

export const searchUser = async (searchName) => {
    if(searchName === undefined) {
        return ({message: ''})
    }
    
    const users = await UserModel.find({ fullName: {$regex: searchName, $options: "si"}}, {fullName: 1, _id: 1, avatarUrl: 1} );
    
    if(!users.length) {
        return ({message: 'Никого не найдено с таким именем'})
    }

    return {users};
}

export const getNotifications = async (id) => {
    const user = await UserModel.findById(id);

    const notifications = user.notifications;
    user.notifications = [];
    await user.save();

    return notifications;
}