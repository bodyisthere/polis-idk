const MAIN_URL = "http://localhost:4444";

const POST_HEADER = {
    method: "post",
    headers: { authorization: localStorage.getItem("token") },
}

const PUT_HEADER = {
    method: "put",
    headers: { authorization: localStorage.getItem("token") },
}

const DELETE_HEADER = {
    method: 'delete',
    headers: {
      authorization: localStorage.getItem('token')
    }
}

const GET_HEADER = {
    method: 'get',
    headers: { authorization: localStorage.getItem("token") },
}

export async function get(messageId) {
    return await fetch(`${MAIN_URL}/message/${messageId}`, GET_HEADER)
}
export async function edit(messageId) {
    return await fetch(`${MAIN_URL}/message/${messageId}`)
}
export async function remove(messagesId, conversationId) {
    return await fetch(`${MAIN_URL}/message/${conversationId}`, {
        method: 'delete',
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({messages : messagesId, conversationId,}),
        
    })
}
export async function create(conversationId, text) {
    console.log(text)
    return await fetch(`${MAIN_URL}/message/${conversationId}`, {
        method: 'post',
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({text: text}),
    }
    )
}