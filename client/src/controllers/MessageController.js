import { httpMessage } from "../http";
import { MessageService } from "../services";

export async function get(messageId, setMessage) {
    try {
        const response = await httpMessage.get(messageId);
        MessageService.get(response, setMessage);
    } catch (err) {
        console.log(err);
    }
}

export async function edit() {}

export async function remove(messagesId, conversationId) {
    try {
        const response = await httpMessage.remove(messagesId, conversationId);
        MessageService.remove(response)
    } catch (err) {
        console.log(err);
    }
}

export async function create(conversationId, text) {
    try {
        const response = await httpMessage.create(conversationId, text)
    } catch (err) {
        console.log(err)
    }
}