import PostModel from "../../schemas/Post.js";
import UserModel from "../../schemas/User.js";

import { handleError } from "../../utils/handleError.js";

//ready
export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      cover: req.body.cover,
      author: req.userId,
    });
    const post = await doc.save();

    const user = await UserModel.findById(req.userId);
    user.posts.push(post._id);

    await user.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось создать статью")
  }
};

//ready
export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    
    const isItAuthor = await PostModel.find({
      _id: postId,
      author: req.userId,
    });
    
    if (!isItAuthor.length) {
      return res.status(403).json({
        message: "Это не ваша статья!",
      });
    }
    
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить статью",
          });
        }
        if (!doc) {
          return res.status(400).json({
            message: "Статья не найдена",
          });
        }
      }
      );

    const user = await UserModel.findById(req.userId);
    user.posts = user.posts.filter(el => el.toString() !== postId)
    await user.save()
      
    res.json({
      postId,
    });
    } catch (err) {
    console.log(err);
    handleError(res, "Не удалось удалить статью")
  }
};

//ready
export const toggleLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;
    let action;

    const post = await PostModel.findById(postId);
  
    if(post.likes.includes(userId)) {
      post.likes = post.likes.filter(el => el !== userId);
      action = 'set like';
      post.save();
    } else {
      post.likes.push(userId);
      action = 'delete like';
      post.save();
    }

    res.json({
      data: post.likes,
      action,
    })

  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось поставить/убрать лайк")
  }
}

//ready
export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findById(postId);
    const user = await UserModel.findById(post.author);
    const { fullName, avatarUrl } = user;

    post.viewsCount += 1;
    await post.save();
    res.json({
      post: post,
      avatarUrl,
      fullName,
    })
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось получить пост")
  }
}

export const commentWrite = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);

    const { fullName, avatarUrl, _id, ...userInfo } = user;
    post.comments.push({
      commentId: Date.now(),
      fullName,
      avatarUrl,
      _id,
      text: req.body.text,
    })

    await post.save();

    res.json({
      comments: post.comments
    })
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось опубликовать комментарий")
  }
}


//не работает
export const commentDelete = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;
  } catch (err) {
    console.log(err);
    handleError(res, "Не удалось удалить комментарий")
  }
}


