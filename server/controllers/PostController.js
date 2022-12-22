import { PostService } from '../services/index.js'
import { handleError } from '../utils/handleError.js';

export const create = async (req, res) => {
    try {
        const post = await PostService.create(req.userId, req.body);
        res.json(post);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось создать статью')
    }
}

export const remove = async (req, res) => {
    try {
        const postId = await PostService.remove(req.userId, req.params.id);
        res.json(postId);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось удалить статью')
    }
}

export const get = async (req, res) => {
    try {
        const response = await PostService.get(req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось получить пост')
    }
}

export const toggleLike = async (req, res) => {
    try {
        const response = await PostService.toggleLike(req.userId, req.params.id);
        res.json(response);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось поставить/убрать лайк')
    }
}
