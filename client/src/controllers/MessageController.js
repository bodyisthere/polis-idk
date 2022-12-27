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

export async function edit(messageId, text, setMessages) {
    const response = await httpMessage.edit(messageId, text);

    MessageService.edit(response, setMessages);
}

export async function remove(messagesId, conversationId, setMessages) {
    try {
        const response = await httpMessage.remove(messagesId, conversationId);
        MessageService.remove(response, setMessages)
    } catch (err) {
        console.log(err);
    }
}

export async function create(conversationId, text, setMessages) {
    try {
        const response = await httpMessage.create(conversationId, text);

        return MessageService.create(response, setMessages);
    } catch (err) {
        console.log(err)
    }
}