export async function createOrGetDialogue(res, setMessages, setConversation) {
    if(!res.ok) throw new Error('Ошибка получения/создания диалога');
    const response = await res.json();
    if(response.conversationId) return;
    setMessages(response.messages);
    setConversation(response);
}

export async function getAllDialogues() {
}

export async function deleteDialogue() {
}