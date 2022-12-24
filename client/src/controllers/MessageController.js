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
export async function remove() {}
export async function create() {}