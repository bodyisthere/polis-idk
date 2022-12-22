import { CommentService } from "../services/index.js"
import { handleError } from "../utils/handleError.js";

export const create = async (req, res) => {
    try {
        const comment = await CommentService.create(req.body.text, req.userId, req.params.postId);
        res.json(comment);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось добавить комментарий")
    }
}

export const remove = async (req, res) => {
    try {
        const commentId = await CommentService.remove(req.userId, req.params.commentId);
        
        res.json(commentId);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось удалить комментарий");
    }
}

export const edit = async (req, res) => {
    try {
        const comment = await CommentService.edit(req.body.text, req.userId, req.params.commentId);
        
        res.json(comment);
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось изменить комментарий");
    }
}

export const get = async (req, res) => {
    try {
        const comment = await CommentService.get(req.params.commentId);

        res.json(comment)
    } catch (err) {
        console.log(err);
        handleError(res, "Не удалось получить комментарий");
    }
    
}