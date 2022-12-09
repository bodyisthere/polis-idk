import mongoose from "mongoose";

export function dBConnect() {
    mongoose
      .connect("mongodb+srv://admin:wwwwww@cluster0.cvi7gkx.mongodb.net/policy?retryWrites=true&w=majority")
      .then(() => console.log("БД подключена! :)"))
      .catch((err) => console.log("Ошибка базы данных: ", err));
}