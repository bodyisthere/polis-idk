import ConversationModel from "../schemas/Conversation.js"
import UserModel from '../schemas/User.js'

export async function createOrGetDialogue(userId, guestId) {
    const conversation = await ConversationModel.findOne({ members: [userId, guestId] });

    const user = await UserModel.findById(userId);
    const guest = await UserModel.findById(guestId);

    if(!user || !guest) throw new Error('Один из пользователей не найден')

    if(!conversation) {
        const doc = new ConversationModel({
            members: [userId, guestId]
        })
        const con = await doc.save();
        user.messages.push(con._id);
        guest.messages.push(con._id);

        await user.save();
        await guest.save();
        return {conversationId : con._id};
    }
    return conversation;
}

export async function deleteDialogue(dialogueId) {
    const conversation = await ConversationModel.findOneAndDelete({ _id : dialogueId });

    if(!conversation) throw new Error('Диалог не найден')

    const users = await Promise.all(conversation.members.map(async el => {
        return await UserModel.findById(el);
    }))

    users.forEach(async el => {
        el.messages = el.messages.filter(el => el.toString() !== dialogueId);
        await el.save();
    })

    return ({message: 'success'});
}

export async function getAllDialogues(userId) {
    const user = await UserModel.findById(userId);

    const dialogues = await Promise.all(user.messages.map(async el => {
        return await ConversationModel.findById(el);
    }))

    return dialogues;
}

