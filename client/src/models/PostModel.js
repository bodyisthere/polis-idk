export async function addNewComment(res, postInfo, setPostInfo, setCommentInput, setPopMessage, setIsPopOpen) {
    if(!res.ok) {
        setPopMessage('Не удалось добавить комментарий');
        setIsPopOpen('declined');
        return setTimeout(() => setIsPopOpen(false), 5000)
    }

    const json = await res.json();

    const { avatarUrl, fullName } = postInfo;
    const { comments, ...post } = postInfo.post;

    setPostInfo({
        avatarUrl,
        fullName,
        post: {
            ...post,
            comments: json.comments,
        }
    })
    setCommentInput('');
    setIsPopOpen('success');
    return setTimeout(() => setIsPopOpen(false), 5000)
}

export async function toggleLike(res, postInfo, setPostInfo, setLikeCondition) {
    if(!res.ok) {
        console.log(res);
    }

    const response = await res.json()

    const { avatarUrl, fullName } = postInfo;
    const { likes, ...post } = postInfo.post;
    setLikeCondition(response.action)
    setPostInfo({
      avatarUrl,
      fullName,
      post: {
      ...post,
      likes: response.data,
      }
    })
}

export async function deletePost(res, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
    if(!res.ok) {
        setPopMessage('Не удалось удалить пост');
        setTimeout(() => setIsPopOpen(false), 5000);
        return setIsPopOpen('declined');
    }

    const response = await res.json();

    let { posts, ...other } = userInfo;

    for(let i = 0; i < posts.length; i++) {
        posts = posts.filter(el => el !== response.postId);
    }
    
    setUserInfo({
        ...other,
        posts
    })
    setIsPopOpen('success');
    setTimeout(() => setIsPopOpen(false), 5000);
}

export async function getPostById(res, setPostInfo) {
    if(!res.ok) {
        console.log(res)
    }
    const response = await res.json()
    setPostInfo(response);
}

export async function uploadCover(res, setIsPopOpen, setPopMessage, setCover) {
    const response = await res.json();

    if(!res.ok) {
        setIsPopOpen('declined');
        setPopMessage(response.message);
        return setTimeout(() => setIsPopOpen(false), 5000);
    }

    setCover(response.url);
    setIsPopOpen('success');
    return setTimeout(() => setIsPopOpen(false), 5000);
}

export async function addNewPost(res, setError, setPopMessage, setIsPopOpen, userInfo, setUserInfo, goTo) {
    const response = await res.json();

    if(!res.ok) {
        setError(response);
        setPopMessage('Не удалось загрузить пост')
        setIsPopOpen('declined');
        return;
    }

    let { posts, ...other } = userInfo;

    posts.unshift(response._id);

    setUserInfo({
    ...other,
    posts
    })

    setIsPopOpen('success');
    setTimeout(() => setIsPopOpen(false), 5000);

    return goTo(`/page/${userInfo._id}`);;
}