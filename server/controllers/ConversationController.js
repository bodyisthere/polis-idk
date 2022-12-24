import { ConversationService } from '../services/index.js'
import { handleError } from "../utils/handleError.js"

export async function createOrGetDialogue(req, res) {
    try {
        const response = await ConversationService.createOrGetDialogue(req.userId, req.params.userId);

        res.json(response);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось получить/создать диалог');
    }
}

export async function deleteDialogue(req, res) {
    try {
        const response = await ConversationService.deleteDialogue(req.params.dialogueId);

        res.json(response);
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось удалить диалог');
    }
}

export async function getAllDialogues(req, res) {
    try {
        const response = await ConversationService.getAllDialogues(req.userId);

        res.json(response);
    } catch (err) {
        handleError(res, 'Не удалось получить диалоги')
    }
}