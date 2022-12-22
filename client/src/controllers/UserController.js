import { tokenAuthReq, toggleFriendReq, changeStatusReq, getNotificationsReq, getByNameReq, getPageReq, authReq } from "../http/httpUser.js"
import { UserService } from "../services/index.js";
import { handleChangeFile } from "../http/httpUniversal.js";


export async function tokenAuth(setUserInfo, setIsAuth, setIsLoading) {
    const res = await tokenAuthReq();

    UserService.tokenAuth(res, setUserInfo, setIsAuth, setIsLoading)
}

export async function toggleFriend(setInActive, guest, setGuest, userInfo, setIsPopOpen) {
    setInActive(true);
    setTimeout(() => setInActive(false), 2000);

    const res = await toggleFriendReq(guest._id);
    UserService.toggleFriend(res, setIsPopOpen, guest, setGuest, userInfo);
}

export async function toggleFriendFromList(id, setIsPopOpen, userInfo, setUserInfo) {
    const res = await toggleFriendReq(id);
    UserService.toggleFriendFromList(res, id, setIsPopOpen, userInfo, setUserInfo)
}

export async function changeAvatar(e, setIsPopOpen, userInfo, setUserInfo) {
    const res = await handleChangeFile(e, 'changeAvatar');
    UserService.changeAvatar(res, setIsPopOpen, userInfo, setUserInfo);
}

export async function changeStatus(statusText, setIsPopOpen, setStatusChange, userInfo, setUserInfo, setStatusText) {
    if (statusText === "") {
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
        return setStatusChange(false);
    }

    const res = await changeStatusReq(statusText);
    UserService.changeStatus(res, userInfo, setUserInfo, setStatusChange, setIsPopOpen, statusText);

    return setStatusText('');
}

export async function getNotifications(notifications, setNotifications) {
    if(notifications.length) return;
    const res = await getNotificationsReq();
    UserService.getNotifications(res, setNotifications)
}

export async function getByName(searchValue, setFoundPeople) {
    if(!searchValue) return;
    const res = await getByNameReq(searchValue);
    UserService.getByName(res, setFoundPeople);
}

export async function getPageInfo(id, setGuest, setIsLoading, setError) {
    const res = await getPageReq(id);
    UserService.getPageInfo(res, setGuest, setError, setIsLoading);
}

export async function auth(URL, body, setUserInfo, setIsAuth, setError, goTo) {
    const res = await authReq(URL, body);
    UserService.auth(res, setUserInfo, setIsAuth, setError, goTo);
}