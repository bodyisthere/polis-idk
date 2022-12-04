export async function checkAuth(guest) {
    const res = await fetch(`http://localhost:4444/check-auth`, {
        method: 'get',
        headers: { authorization: localStorage.getItem("token") },
    })
    if(!res.ok) return false;
    return true;
}