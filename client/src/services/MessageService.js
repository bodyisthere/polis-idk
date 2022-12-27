export async function get(res, setMessage) {
    if(!res.ok) throw new Error('Не удалось получить сообщение');

    const response = await res.json();
    setMessage(response);
}

export async function edit(res, setMessages) {
    if(!res.ok) throw new Error('Не удалось изменить сообщение')

    const data = await res.json();
    console.log(data)
}

export async function remove(res, setMessages) {
    if(!res.ok) throw new Error('Не удалось удалить сообщения');

    const deletedMessagesId = await res.json();
    console.log(deletedMessagesId)
    setMessages(prev => prev.map(el => {
        if(deletedMessagesId.messages.includes(el)) return 'deleted' 
        return el
    }))
}

export async function create(res, setMessages) {
    if(!res.ok) throw new Error('Не удалось отправить сообщение');

    const response = await res.json();
    setMessages(prev => [...prev, response._id])
    return response;
}