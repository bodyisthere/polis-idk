const MAIN_URL = "http://localhost:4444";

const GET_HEADER = {
    method: "get",
    headers: { authorization: localStorage.getItem("token") },
}

const PUT_HEADER = {
    method: "put",
    headers: { authorization: localStorage.getItem("token") },
}

const POST_HEADER = {
    method: "put",
    headers: { authorization: localStorage.getItem("token") },
}

const DELETE_HEADER = {
    method: "delete",
    headers: { authorization: localStorage.getItem("token") },
}

export async function get(commentId) {
    return await fetch(`${MAIN_URL}/comment/${commentId}`, GET_HEADER);
}

export async function update(commentId) {
    return await fetch(`${MAIN_URL}/comment/${commentId}`, PUT_HEADER);
}

export async function create(text, postId) {
    const body = JSON.stringify({text: text});
    return await fetch(`${MAIN_URL}/comment/${postId}`, {
        method: "post",
        headers: { authorization: localStorage.getItem("token"), 'Content-Type': 'application/json' },
        body,
    });
}

export async function remove(commentId) {
    return await fetch(`${MAIN_URL}/comment/${commentId}`, DELETE_HEADER);
}