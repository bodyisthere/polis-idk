import MessageModel from "../schemas/Message.js"
import ConversationModel from "../schemas/Conversation.js"

export async function create(conversationId, senderId, text) {
    if(!text) throw new Error('Текст сообщения не может быть пуст')
    const doc = new MessageModel({
        sender: senderId,
        text: text,
    });

    const message = await doc.save();
    const conversation = await ConversationModel.findById(conversationId);

    conversation.messages.push(message._id);
    await conversation.save();

    return message;
}

export async function get(messageId) {
    const message = await MessageModel.findById(messageId);

    return message;
}

export async function edit(userId, messageId, text) {
    const message = await MessageModel.findById(messageId);

    if(text.length < 0) throw new Error('Текст сообщения не может быть пустым')
    if(message.sender.toString() !== userId) throw new Error('Вы не можете редактировать чужое сообщение');

    message.text = text;
    message.isEdited = true;
    await message.save();

    return message;
}

export async function remove(messageId, conversationId) {
    const message = await MessageModel.findOneAndDelete(messageId);
    const conversation = await ConversationModel.findById(conversationId);

    conversation.messages = conversation.messages.filter(el => el._id !== messageId);
    conversation.save();

    return {message: 'success'};
}