import ConversationModel from "../schemas/Conversation.js"
import UserModel from '../schemas/User.js'

export async function createOrGetDialogue(userId, guestId) {
    const conversation = await ConversationModel.findOne({ members: [userId, guestId] });

    const user = await UserModel.findById(userId);
    const guest = await UserModel.findById(guestId);

    if(!conversation) {
        const doc = new ConversationModel({
            members: [userId, guestId]
        })
        const con = await doc.save();
        user.messages = [...user.messages, con._id];
        guest.messages = [...guest.messages, con._id];

        await user.save();
        await guest.save();
        return con._id;
    }
    console.log('Диалог уже есть!')
}