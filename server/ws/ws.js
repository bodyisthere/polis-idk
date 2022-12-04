import UserModel from "../schemas/User.js";
import { wss } from "../index.js";

export async function wsConnection (ws, req) {
  const userId = req.url.slice(2).split('&with=')[0];
  const guestId = req.url.slice(2).split('&with=')[1];
  
  const user = await UserModel.findById(userId);
  const guest = await UserModel.findById(guestId);

  const dialogueId = Date.now();

  console.log(`Юзер ${user.fullName} хочет пообщаться с ${guest.fullName}`)
  
  let i = 0;
  let theyHaveDialogue = false;
  let dialogue = [];
  while(i < user.messages.length && !theyHaveDialogue ) {
    if(user.messages[i].id === guestId) {
      theyHaveDialogue = true;
      dialogue = user.messages[i]
    }
    i++;
  }
  
  if(!theyHaveDialogue) {
    console.log('Создаём диалог')
    user.messages.push({id: guestId, dialogueId, msg: []})
    guest.messages.push({id: userId, dialogueId, msg: []})
    await user.save()
    await guest.save()
    ws.id = dialogueId;
    dialogue = {id: userId, dialogueId, msg: []};
    ws.send('Диалог создан!')
  } 

  if(theyHaveDialogue) {
    ws.id = dialogue.dialogueId;
    ws.send(JSON.stringify(dialogue.msg))
  }

  ws.on('message', async (rawMessage) => {
    const {author, message, time} = JSON.parse(rawMessage);
    dialogue.msg.push({author, message, time});
    guest.messages = guest.messages.map(el => el.id === userId ? {...el, msg: dialogue.msg} : el)
    console.log(guest.messages)
    await guest.save();
    broadcastMessage(message, author, time, theyHaveDialogue ? dialogue.dialogueId : dialogueId)
  })

  ws.on('close', async () => {
    user.messages = user.messages.map(el => el.id === guestId ? {...el, msg: dialogue.msg} : el)
    await user.save();
    console.log(`${user.fullName} closed`)
  })

}

function saveMessage(user, guest) {

}

function broadcastMessage(message, author, time, id) {
  wss.clients.forEach(client => {
    if(client.id === id)
    client.send(JSON.stringify({message, author, time}));
  })
}