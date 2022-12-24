export async function get(res, setMessage) {
    if(!res.ok) throw new Error('Не удалось получить сообщение');

    const response = await res.json();
    setMessage(response);
}
export async function edit() {}
export async function remove() {}
export async function create() {}