import UserModel from "../schemas/User.js";

export async function getFriends(arr) {
    let i = 0;
    let friends = [];
    while(arr.length > i) {
      const fr = await UserModel.findById(arr[i], {fullName: 1, avatarUrl: 1, _id: 1});
      friends.push(fr)
      i += 1;
    }
    return friends;
  }