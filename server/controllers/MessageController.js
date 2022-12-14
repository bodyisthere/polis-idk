import MessageModel from "../schemas/Message.js"
import UserModel from '../schemas/User.js'
import ConversationModel from "../schemas/Conversation.js"
import { handleError } from "../utils/handleError.js"


export async function createDialogue(req, res) {
    try {
        const doc = new ConversationModel({
            members: [req.userId, req.params.guestId]
        })

        const user = await UserModel.findById(req.userId);
        const guest = await UserModel.findById(req.params.guestId);

        guest.messages.push(doc._id);
        guest.save();
        user.messages.push(doc._id);
        user.save();
        await doc.save();

        res.json({
            message: 'Диалог успешно создан!'
        })
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось создать диалог');
    }
}

export async function getDialogue(req, res) {
    try {
        const userId = req.userId;
        const dialogue = await ConversationModel.findById(req.params.id);
        if(!dialogue.members.includes(userId)) {
            return res.json({
                message: 'У вас нет доступа к этому диалогу!'
            })
        }

        res.json(dialogue)
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось получить диалог');
    }
}

export async function deleteDialogue(req, res) {
    try {
        const userId = req.userId;
        const dialogue = await ConversationModel.findById(req.params.id)
        if(!dialogue.members.includes(userId)) {
            return res.json({
                message: 'У вас нет доступа к этому диалогу!'
            })
        }
        
        await dialogue.remove()

        res.json({
            message: "Диалог успешно удален!"
        })
    } catch (err) {
        console.log(err);
        handleError(res, 'Не удалось получить диалог');
    }
}

export async function getAllDialogues(req, res) {
    try {
        const userId = req.userId;
        let dialogues = await ConversationModel.find({ members: {$in: [userId]} })

        dialogues = await Promise.all(
            dialogues.map(async el => {
                let { members, ...other } = el._doc;

                members = await Promise.all(members.map(async el => {
                    if(el === userId) return;
                    return await UserModel.findById(el, {
                    fullName: 1, _id: 1, avatarUrl: 1
                    })
                }))
    
                return {
                    members,
                    ...other
                }
            })
        )
        
        res.json(dialogues);
    } catch (err) {
        handleError(res, 'Не удалось получить диалоги')
    }
}