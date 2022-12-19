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

export const toggleFriend = async () => {

}

export const changeStatus = async () => {

}

export const searchUser = async () => {

}

export const getNotifications = async () => {

}