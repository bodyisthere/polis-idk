import { ConversationService } from '../services/index.js'

export async function createOrGetDialogue(req, res) {
    ConversationService.createOrGetDialogue(req.userId, req.params.id);
    // res.json()
}