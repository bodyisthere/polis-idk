import UserModel from "../schemas/User.js";
import PostModel from "../schemas/Post.js";

export const upload = async (req, res) => {
    try {
        const myId = req.userId;

        const jpg =  new RegExp(/.jpg$/,'gi')
        const png =  new RegExp(/.png$/,'gi')
        if(!jpg.test(req.file.filename) && !png.test(req.file.filename)) {
          throw new Error('Загрузите только jpg и png')
        }

        if(req.headers.type === 'changeAvatar') {
            await UserModel.updateOne(
              { _id: myId },
              { avatarUrl: req.file.originalname }
            );
        }
          
        return res.json({
          url: `/${req.file.originalname}`,
        });
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
      }
}