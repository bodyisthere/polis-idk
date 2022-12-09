import UserModel from "../schemas/User.js";

export class User {
    
    constructor(userId) {
        this.userId = userId;
    }

    async getById() {
        const user = await UserModel.findById(this.userId);
        return user;
    }

    async getByProps(props) {
        const user = await UserModel.find({
            ...props
        })

        return user;
    }

    async getUserFriends(friendList) {
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

    isTheyFriend(userFriendsArray, friendId) {
        let answer = true;
        let index = 0;

        while (answer && index < userFriendsArray.length) {
            if (userFriendsArray[index]._id.toString() === friendId) {
              answer = false;
            }
            index += 1;
        }
        return answer;
    }
}
