import { httpConversation } from "../http";
import { ConversationService } from "../services";

export async function createOrGetDialogue(guestId, setMessages) {
    const response = await httpConversation.createOrGetDialogue(guestId);
    ConversationService.createOrGetDialogue(response, setMessages);
}

export async function getAllDialogues() {
}

export async function deleteDialogue() {
}