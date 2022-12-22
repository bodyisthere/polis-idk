import PostModel from "../schemas/Post.js";
import UserModel from '../schemas/User.js'

export const create = async (id, body) => {
    const doc = new PostModel({
        title: body.title,
        text: body.text,
        cover: body.cover,
        author: id, 
    });
    const post = await doc.save();

    const user = await UserModel.findById(id);
    user.posts.push(post._id);
    await user.save();

    return post;
}

export const remove = async (id, postId) => {
    const isItAuthor = await PostModel.find({ _id: postId, author: id });

    if(!isItAuthor.length) throw new Error({ message: "Это не ваша статья!"});
    
    const user = await UserModel.findById(id);
    user.posts = user.posts.filter(el => el.toString() !== postId);
    await user.save();

    await PostModel.findOneAndDelete({ _id: postId })

    return { postId };
}

export const toggleLike = async (id, postId) => {
    let action;

    const post = await PostModel.findById(postId);

    if(post.likes.includes(id)) {
        post.likes = post.likes.filter(el => el !== id);
        action = 'set like';
        await post.save()
    } else {
        post.likes.push(id);
        action = 'delete like';
        await post.save()
    }

    return ({ data: post.likes, action})
}

export const get = async (postId) => {
    const post = await PostModel.findById(postId);
    const user = await UserModel.findById(post.author);
    const { fullName, avatarUrl } = user;

    post.viewsCount += 1;
    await post.save();
    
    return ({
        post,
        avatarUrl,
        fullName,
    })
}
