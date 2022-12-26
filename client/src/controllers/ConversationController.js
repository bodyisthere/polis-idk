import { httpConversation } from "../http";
import { ConversationService } from "../services";

export async function createOrGetDialogue(guestId, setMessages, setConversation) {
    const response = await httpConversation.createOrGetDialogue(guestId);
    ConversationService.createOrGetDialogue(response, setMessages, setConversation);
}

export async function getAllDialogues() {
}

export async function deleteDialogue() {
}