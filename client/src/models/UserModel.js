export async function tokenAuth(res, setUserInfo, setIsAuth, setIsLoading) {
    const response = await res.json();
    
    setUserInfo(response);
    setIsAuth(true);
    setIsLoading(false);
}

export async function toggleFriend(res, setIsPopOpen, guest, setGuest, user, setPopMessage) {
    const response = await res.json();
    setTimeout(() => setIsPopOpen(false), 5000);
    if(response.message === 'Вы добавили этого человека в друзья') {
        setIsPopOpen('success');
        const { friendList, ...other } = guest;
        friendList.push({
            avatarUrl: user.avatarUrl,
            fullName: user.fullName,
            _id: user._id,
        })
        return setGuest({
            ...other,
            friendList
        })
    }
    if(response.message === 'Вы удалили этого человека из друзей') {
        setIsPopOpen('success');
        let { friendList, ...other } = guest;
        friendList = friendList.filter(el => el._id !== user._id);
        return setGuest({
            ...other,
            friendList
        })
    }
    setPopMessage(`${response.message}`);
    setIsPopOpen('declined');
    setTimeout(() => setIsPopOpen(false), 5000);
}

export async function toggleFriendFromList(res, id, setIsPopOpen, setPopMessage, userInfo, setUserInfo) {
    if(!res.ok) {
            const json = await res.json();
            setPopMessage(json?.message ? json.message : 'Не удалось');
            setIsPopOpen('declined');
            return setTimeout(() => setIsPopOpen(false), 5000)
        }

        let {friendList, ...other} = userInfo;
        friendList = friendList.filter(el => el._id !== id)
        setUserInfo({friendList, ...other})
        
        setIsPopOpen('success');
        return setTimeout(() => setIsPopOpen(false), 5000)
}

export async function changeAvatar(res, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
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

export async function changeStatus(res, setPopMessage, userInfo, setUserInfo, setStatusChange, setIsPopOpen, statusText) {
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
}

export async function getNotifications(res, setNotifications) {
    if(!res.ok) console.log('Ошибка получения уведомлений!');
    
    const response = await res.json();
    setNotifications(response);
}

export async function getByName(res, setFoundPeople) {
    if(!res.ok) return console.log('Не удалось получить пользователей!');

    const response = await res.json();
    setFoundPeople(response.users);
}

export async function getPageInfo(res, setGuest, setError, setIsLoading) {
    if (!res.ok) {
        console.log('Не удалось получить пользователя')
        return setError(true)
    }
    const json = await res.json();
    setGuest(json);
    setIsLoading(false)
}

export async function auth(res, setUserInfo, setIsAuth, setError, goTo) {
    const response = await res.json();

    if (!res.ok) {
        setError(response);
        throw new Error(`${res.statusText}`);
      }
  
    setUserInfo(response);
    setIsAuth(true);
    localStorage.setItem("token", response.token);
    setError("");
    return response._id ? goTo(`/page/${response._id}`) : ''
}