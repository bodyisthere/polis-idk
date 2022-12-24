const MAIN_URL = "http://localhost:4444";

const POST_HEADER = {
    method: "post",
    headers: { authorization: localStorage.getItem("token") },
}

export async function createOrGetDialogue(guestId) {
    return await fetch(`${MAIN_URL}/conversation/${guestId}`, POST_HEADER);
}

export async function getAllDialogues() {
    return await fetch(`${MAIN_URL}/conversation`);
}

export async function deleteDialogue(conversationId) {
    return await fetch(`${MAIN_URL}/conversation/${conversationId}`);
}