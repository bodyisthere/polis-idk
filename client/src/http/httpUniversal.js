export async function handleChangeFile(e, type) {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    const res = await fetch('http://localhost:4444/upload', {
        method: 'post',
        body: formData,
        headers: {
            authorization: localStorage.getItem('token'),
            type,
        }
    })
    return res;
}