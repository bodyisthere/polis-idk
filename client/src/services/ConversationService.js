export async function createOrGetDialogue(res, setMessages) {
    if(!res.ok) throw new Error('Ошибка получения/создания диалога');
    const response = await res.json();
    if(response.conversationId) return;
    setMessages(response.messages);
}

export async function getAllDialogues() {
}

export async function deleteDialogue() {
}