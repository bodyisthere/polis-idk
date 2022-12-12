import { handleChangeFile } from "../utils/handleChangeFile.js";


export function tokenAuth(setUserInfo, setIsLoading, setIsAuth) {
  if (localStorage.getItem("token")) {
    fetch("http://localhost:4444/auth/token", {
      method: "post",
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((data) => data.json())
    .then((json) => {
      setUserInfo(json);
      setIsLoading(false)
    });
    setIsAuth(true);
  } else {
    setIsAuth(false);
    setIsLoading(false)
  }
}

export function toggleFriend({ setInActive, guest, setIsPopOpen, userInfo, setGuest, setPopMessage }) {
      setInActive(true);
      setTimeout(() => setInActive(false), 2000)
      fetch(`http://localhost:4444/friend/${guest._id}`, {
        method: 'put',
        headers: {
          authorization: localStorage.getItem('token'),
        }
      })
      .then(res => {
        if(!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then(json => {
        setIsPopOpen('success');
        setTimeout(() => setIsPopOpen(false), 5000);
        if(json.message === 'Вы добавили этого человека в друзья') {
          const { friendList, ...other } = guest;
          friendList.push({
            avatarUrl: userInfo.avatarUrl,
            fullName: userInfo.fullName,
            _id: userInfo._id
          })
          setGuest({
            ...other,
            friendList
          })
        }
        if(json.message === 'Вы удалили этого человека из друзей') {
          let { friendList, ...other } = guest;
          friendList = friendList.filter(el => el._id !== userInfo._id)
          setGuest({
            ...other,
            friendList
          })
        }
      })
      .catch(() => {
        setPopMessage('Не удалось удалить/добавить в друзья');
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
      })
}

export async function changeStatus(statusText, setPopMessage, setIsPopOpen, setStatusChange, userInfo, setUserInfo, setStatusText) {
  try {
    if (statusText === "") {
      setPopMessage('Статус не может быть пуст');
      setIsPopOpen('declined');
      setTimeout(() => setIsPopOpen(false), 5000)
      return setStatusChange(false);
    }

    const res = await fetch("http://localhost:4444/status-set", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        status: statusText,
      }),
    });

    if (!res.ok) {
      const resJson = await res.json()
      setPopMessage(resJson.message);
      throw new Error(resJson?.message);
    }


    const { status, ...other } = userInfo;
    setUserInfo( {
      ...other,
      status: statusText
    })
    setStatusChange(false);
    setIsPopOpen('success');
    setTimeout(() => setIsPopOpen(false), 5000)
    return setStatusText('');
  } catch (err) {
    setIsPopOpen('declined')
    return setTimeout(() => setIsPopOpen(false), 5000);
  }
}

export async function handleChangeAvatar(e, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
  const res = await handleChangeFile(e, 'changeAvatar')
      if(!res.ok) {
        const json = await res.json()
        setPopMessage(json.message);
        setIsPopOpen('declined');
        return setTimeout(() => setIsPopOpen(false), 5000)
      }
      
      const json = await res.json();

      const { avatarUrl, ...other} = userInfo;

        setUserInfo({
          avatarUrl: json.url,
          ...other
        })
        setIsPopOpen('success');
        return setTimeout(() => setIsPopOpen(false), 5000);
}

export async function deletePost(id, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
  const res = await fetch(`http://localhost:4444/posts/${id}`, {
    method: 'delete',
    headers: {
      authorization: localStorage.getItem('token')
    }
  });

  if(!res.ok) {
    setPopMessage('Не удалось удалить пост');
    setTimeout(() => setIsPopOpen(false), 5000)
    return setIsPopOpen('declined');
  }

  const json = await res.json();

  let { posts, ...other } = userInfo;

  for(let i = 0; i < posts.length; i++) {
    posts = posts.filter(el => el !== json.postId);
  }
  
  setUserInfo({
    ...other,
    posts
  })
  setIsPopOpen('success');
  setTimeout(() => setIsPopOpen(false), 5000);
}

export function getPostById(id, setPostInfo) {
  fetch(`http://localhost:4444/post/${id}`)
    .then(data => data.json())
    .then(json => setPostInfo(json))
}

export async function addNewComment(id, commentInput, postInfo, setPostInfo, setCommentInput) {
  const res = await fetch(`http://localhost:4444/post/${id}`, {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: `${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({text: commentInput}),
        });

        if(!res.ok) {
            console.log('error')
            return;
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
}

export function toggleLike(id, postInfo, setLikeCondition, setPostInfo) {
  fetch(`http://localhost:4444/post/${id}`, {
    method: 'put',
    headers: {
      authorization: `${localStorage.getItem("token")}`,
    }
  })
  .then(data => data.json())
  .then(json => {
    const { avatarUrl, fullName } = postInfo;
    const { likes, ...post } = postInfo.post;
    setLikeCondition(json.action)
    setPostInfo({
      avatarUrl,
      fullName,
      post: {
      ...post,
      likes: json.data,
      }
    })
  })
}