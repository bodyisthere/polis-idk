const MAIN_URL = "http://localhost:4444";

const GET_HEADER = {
    method: "get",
    headers: { authorization: localStorage.getItem("token") },
}

const DELETE_HEADER = {
    method: "delete",
    headers: { authorization: localStorage.getItem("token") },
}

export async function get(commentId) {
    return await fetch(`${MAIN_URL}/comment/${commentId}`, GET_HEADER);
}

export async function edit(commentId, text) {
    return await fetch(`${MAIN_URL}/comment/${commentId}`, {
        method: "put",
        body: JSON.stringify(text),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
    });
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