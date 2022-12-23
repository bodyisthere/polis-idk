import { httpComment } from '../http/index.js';
import { CommentService } from '../services/index.js';

export async function get(commentId, setComment) {
    try {
        const response = await httpComment.get(commentId);
        return await CommentService.get(response, setComment);
    } catch (err) {
        console.log(err);
    }
}
export async function edit(commentId, text, setComment, setIsPopOpen) {
    try {
        if(text.length === 0) return;
        const res = await httpComment.edit(commentId, text);
        
        CommentService.edit(res, setComment, setIsPopOpen);
    } catch (err) {
        console.log(err);
    }
}
export async function create(text, postId, postInfo, setPostInfo, setCommentInput, setIsPopOpen) {
    try {
        setCommentInput('');
        const response = await httpComment.create(text, postId);
        CommentService.create(response, postInfo, setPostInfo, setIsPopOpen);
    } catch (err) {
        console.log(err);
    }
}
export async function remove(commentId, postInfo, setPostInfo, setIsPopOpen) {
    try {
        const res = await httpComment.remove(commentId);
        CommentService.remove(res, postInfo, setPostInfo, setIsPopOpen);
    } catch (err) {
        console.log(err);
    }
}