import { body } from "express-validator";

export const registrationValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("fullName", "Минимальная длина имена 2 символа")
    .isString()
    .isLength({ min: 2 }),
  body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
  body("avatar", "Неверное изображение").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи").isLength({ min: 5 }).isString(),
  body("text", "Введите текст статьи").isLength({ min: 5 }).isString()
];
