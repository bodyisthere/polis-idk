import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../schemas/User.js";
import { User } from "../Classes/ClassUser.js";
import { handleError } from '../utils/handleError.js'

export const registration = async (req, res) => {
  try {
    const isUnique = await UserModel.findOne({ email: req.body.email });

    if (isUnique) {
      return res.status(400).json({
        message: "Пользователь с таким email уже существует!",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: hash,
      avatarUrl: req.body.avatarUrl,
    });

    //save document in db
    const user = await doc.save();

    const token = jwt.sign({ userId: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      token,
      ...userData
    });
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось зарегестрироваться")
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      { _id: user._id }, "secret123",{ expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(`Ошибка авторизации: ${err}`);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const loginWithToken = async (req, res) => {
  try {
    const userId = req.userId;
    const userClass = new User(userId);
    const user = await UserModel.findById(userId);

    const friends = await userClass.getUserFriends(user.friendList);

    const { passwordHash, email, ...userData } = user._doc;

    userData.friendList = friends;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userClass = new User(id);
    const user = await UserModel.findById(id);

    const friends = await userClass.getUserFriends(user.friendList);

    const { passwordHash, email, ...userData } = user._doc;

    userData.friendList = friends;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось получить пользователя")
  }
};

export const toggleFriend = async (req, res) => {
  try {
    let action = "";
    let currentUser = await UserModel.findById(req.userId);
    let friend = await UserModel.findById(req.params.id);

    const user = new User(req.userId);

    if (user.isTheyFriend(currentUser.friendList, req.params.id)) {
      action = "Вы добавили этого человека в друзья";
      currentUser.friendList = [...currentUser.friendList, friend._id];
      friend.friendList = [...friend.friendList, currentUser._id];
    } else {
      action = "Вы удалили этого человека из друзей";
      currentUser.friendList = currentUser.friendList.filter(
        (el) => el._id.toString() !== req.params.id
      );

      friend.friendList = friend.friendList.filter(
        (el) => el._id.toString() !== req.userId
      );
    }

    await currentUser.save();
    await friend.save();

    res.json({
      message: action,
    });
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось добавить в друзья")
  }
};

export const changeStatus = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    user.status = req.body.status;

    await user.save();

    res.json({
      message: "Статус успешно изменён!",
    });
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось изменить статус")
  }
};

export const searchUser = async (req, res) => {
  try {
    const searchName = req.query.name;
    
    if(searchName === undefined) {
      return res.json({
        message: ''
      })
    }
    
    const users = await UserModel.find({ fullName: {$regex: searchName, $options: "si"}}, {fullName: 1, _id: 1, avatarUrl: 1} )

    if(!users.length) {
      return res.json({
        message: 'Никого не найдено с таким именем'
      })
    }
    res.json({
      users,
    })
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось совершить запрос на поиск")
  }
}

export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await new User(userId).getById();
    const notifications = user.notifications;
    user.notifications = [];
    // await user.save();
    res.json(notifications)
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось получить уведомления")
  }
}

export const messages = async (req, res) => {
  res.status(200).json({
    success: true,
  })
}


