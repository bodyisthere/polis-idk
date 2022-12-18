export async function getAllMessages(setMessages) {
  try {
    let res = await fetch('http://localhost:4444/conversation', {
      method: 'get',
      headers: {
        authorization: `${localStorage.getItem("token")}`,
      }
    });

    if(!res.ok) throw new Error('Ошибка получения сообщений');

    res = await res.json();
    setMessages(res);
  } catch (err) {
    console.log(err)
  }
  
}

