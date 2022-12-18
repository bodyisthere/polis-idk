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

export async function getPostByIdReq(id) {
    return await fetch(`${MAIN_URL}/post/${id}`)
}

export async function addNewCommentReq(id, comment) {
    return await fetch(`${MAIN_URL}/post/${id}`, {
    method: 'post',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({text: comment}),
    })
}

export async function toggleLikeReq(id) {
    return await fetch(`${MAIN_URL}/post/${id}`, PUT_HEADER)
}

export async function deletePostReq(id) {
    return await fetch(`${MAIN_URL}/posts/${id}`, DELETE_HEADER);
}

export async function addNewPostReq(body) {
    return await fetch('http://localhost:4444/posts', {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("token")}`,
        },
      })
}