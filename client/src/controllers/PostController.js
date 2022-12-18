import { getPostByIdReq, addNewCommentReq, toggleLikeReq, deletePostReq, addNewPostReq } from "../http/httpPost";
import { handleChangeFile } from "../http/httpUniversal.js";
import { PostModel } from '../models/index.js'

export async function getPostById(id, setPostInfo) {
    const res = await getPostByIdReq(id);
    PostModel.getPostById(res, setPostInfo)
}

export async function addNewComment(id, comment, postInfo, setPostInfo, setCommentInput, setPopMessage, setIsPopOpen) {
    if(comment.length === 0) return;
    const res = await addNewCommentReq(id, comment);
    PostModel.addNewComment(res, postInfo, setPostInfo, setCommentInput, setPopMessage, setIsPopOpen)
}

export async function toggleLike(id, postInfo, setLikeCondition, setPostInfo) {
    const res = await toggleLikeReq(id);
    PostModel.toggleLike(res, postInfo, setPostInfo, setLikeCondition);
}

export async function deletePost(id, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
    const res = await deletePostReq(id);
    PostModel.deletePost(res, setPopMessage, setIsPopOpen, userInfo, setUserInfo);
}

export async function uploadCover(e, setIsPopOpen, setPopMessage, setCover) {
    const res = await handleChangeFile(e);
    PostModel.uploadCover(res, setIsPopOpen, setPopMessage, setCover)
};

export async function addNewPost(body, setError, setPopMessage, setIsPopOpen, userInfo, setUserInfo, goTo) {
    const res = await addNewPostReq(body);
    PostModel.addNewPost(res, setError, setPopMessage, setIsPopOpen, userInfo, setUserInfo, goTo)
}