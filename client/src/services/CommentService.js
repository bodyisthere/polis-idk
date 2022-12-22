export async function get(response, setComment) {
    if(!response.ok) throw new Error('Ошибка получения комментария')
    setComment(await response.json());
}
export async function update() {
    
}
export async function create(response, postInfo, setPostInfo, setIsPopOpen) {
    if(!response.ok) {
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
        throw new Error('Ошибка добавления комментария');
    }
    const comment = await response.json();
    const { comments, ...other } = postInfo.post;
    const { avatarUrl, fullName } = postInfo;
    comments.push(comment._id);
    setPostInfo({
        avatarUrl,
        fullName, 
        post: {...other, comments}
    });
}
export async function remove(res, postInfo, setPostInfo, setIsPopOpen) {
    if(!res.ok) {
        setIsPopOpen('declined')
        setTimeout(() => setIsPopOpen(false), 5000)
        throw new Error('Ошибка удаления')
    }
    const comment = await res.json();
    let { comments, ...other } = postInfo.post;
    const { avatarUrl, fullName } = postInfo;
    comments = comments.filter(el => el !== comment);
    setPostInfo({
        avatarUrl,
        fullName, 
        post: {...other, comments}
    });
}
