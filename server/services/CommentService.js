import PostModel from "../schemas/Post.js";
import CommentModel from "../schemas/Comment.js";
import UserModel from "../schemas/User.js"

const isItAuthor = (id, commentAuthor) => id === commentAuthor.toString() ? true : false

export const create = async (text, userId, postId) => {
    const doc = new CommentModel({
        postId,
        author: userId,
        text,
    });
    const comment = await doc.save();

    const post = await PostModel.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    return comment;
}

export const remove = async (userId, commentId) => {
    const comment = await CommentModel.findById(commentId);
    const post = await PostModel.findById(comment.postId);

    if(!isItAuthor(userId, comment.author)) throw new Error("Это не ваш комментарий!");

    post.comments = post.comments.filter(el => el.toString() !== commentId);
    console.log(post.comments)
    await post.save();
    await CommentModel.findOneAndDelete({ _id : commentId});
    return commentId;
}

export const edit = async (text, userId, commentId) => {
    const comment = await CommentModel.findById(commentId);

    if(!isItAuthor(userId, comment.author)) throw new Error("Это не ваш комментарий!");

    comment.text = text;
    comment.isEdited = true;
    const updatedComment = comment.save();

    return updatedComment;
}

export const get = async (commentId) => {
    const comment = await CommentModel.findById(commentId);
    const author = await UserModel.findById(comment.author, { _id: 1, fullName: 1, avatarUrl: 1});
    comment.author = author;
    return comment;
}