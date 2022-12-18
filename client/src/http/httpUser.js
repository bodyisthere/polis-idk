const MAIN_URL = "http://localhost:4444";

const POST_HEADER = {
    method: "post",
    headers: { authorization: localStorage.getItem("token") },
}

const PUT_HEADER = {
    method: "put",
    headers: { authorization: localStorage.getItem("token") },
}

const GET_HEADER = {
    method: 'get',
    headers: { authorization: localStorage.getItem("token") },
}

export async function tokenAuthReq() {
    return await fetch(`${MAIN_URL}/auth/token`, POST_HEADER)
}

export async function toggleFriendReq(id) {
    return await fetch(`${MAIN_URL}/friend/${id}`, PUT_HEADER);
}

export async function changeStatusReq(statusText) {
    return await fetch(`${MAIN_URL}/status-set`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: statusText,
        }),
    })
}

export async function getNotificationsReq() {
    return await fetch('http://localhost:4444/notifications', GET_HEADER)
}

export async function getByNameReq(searchValue) {
    return await fetch(`http://localhost:4444/friend-search?name=${searchValue}`)
}

export async function getPageReq(id) {
    return await fetch(`http://localhost:4444/page/${id}`)
}