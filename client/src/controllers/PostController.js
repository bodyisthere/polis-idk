import { getPostByIdReq, toggleLikeReq, deletePostReq, addNewPostReq } from "../http/httpPost";
import { handleChangeFile } from "../http/httpUniversal.js";
import { PostService } from '../services/index.js'

export async function getPostById(id, setPostInfo) {
    const res = await getPostByIdReq(id);
    PostService.getPostById(res, setPostInfo)
}

export async function toggleLike(id, postInfo, setLikeCondition, setPostInfo) {
    const res = await toggleLikeReq(id);
    PostService.toggleLike(res, postInfo, setPostInfo, setLikeCondition);
}

export async function deletePost(id, setIsPopOpen, userInfo, setUserInfo) {
    const res = await deletePostReq(id);
    PostService.deletePost(res, setIsPopOpen, userInfo, setUserInfo);
}

export async function uploadCover(e, setIsPopOpen, setCover) {
    const res = await handleChangeFile(e);
    PostService.uploadCover(res, setIsPopOpen, setCover)
};

export async function addNewPost(body, setError, setIsPopOpen, userInfo, setUserInfo, goTo) {
    const res = await addNewPostReq(body);
    PostService.addNewPost(res, setError, setIsPopOpen, userInfo, setUserInfo, goTo)
}