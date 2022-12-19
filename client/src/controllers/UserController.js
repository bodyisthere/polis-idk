import { tokenAuthReq, toggleFriendReq, changeStatusReq, getNotificationsReq, getByNameReq, getPageReq, authReq } from "../http/httpUser.js"
import { UserModel } from "../models/index.js";
import { handleChangeFile } from "../http/httpUniversal.js";


export async function tokenAuth(setUserInfo, setIsAuth, setIsLoading) {
    const res = await tokenAuthReq();

    UserModel.tokenAuth(res, setUserInfo, setIsAuth, setIsLoading)
}

export async function toggleFriend(setInActive, guest, setGuest, userInfo, setIsPopOpen, setPopMessage) {
    setInActive(true);
    setTimeout(() => setInActive(false), 2000);

    const res = await toggleFriendReq(guest._id);
    UserModel.toggleFriend(res, setIsPopOpen, guest, setGuest, userInfo, setPopMessage);
}

export async function toggleFriendFromList(id, setIsPopOpen, setPopMessage, userInfo, setUserInfo) {
    const res = await toggleFriendReq(id);
    UserModel.toggleFriendFromList(res, id, setIsPopOpen, setPopMessage, userInfo, setUserInfo)
}

export async function changeAvatar(e, setPopMessage, setIsPopOpen, userInfo, setUserInfo) {
    const res = await handleChangeFile(e, 'changeAvatar');
    UserModel.changeAvatar(res, setPopMessage, setIsPopOpen, userInfo, setUserInfo);
}

export async function changeStatus(statusText, setPopMessage, setIsPopOpen, setStatusChange, userInfo, setUserInfo, setStatusText) {
    if (statusText === "") {
        setPopMessage('Статус не может быть пуст');
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
        return setStatusChange(false);
    }

    const res = await changeStatusReq(statusText);
    UserModel.changeStatus(res, setPopMessage, userInfo, setUserInfo, setStatusChange, setIsPopOpen, statusText);

    return setStatusText('');
}

export async function getNotifications(notifications, setNotifications) {
    if(notifications.length) return;
    const res = await getNotificationsReq();
    UserModel.getNotifications(res, setNotifications)
}

export async function getByName(searchValue, setFoundPeople) {
    if(!searchValue) return;
    const res = await getByNameReq(searchValue);
    UserModel.getByName(res, setFoundPeople);
}

export async function getPageInfo(id, setGuest, setIsLoading, setError) {
    const res = await getPageReq(id);
    UserModel.getPageInfo(res, setGuest, setError, setIsLoading);
}

export async function auth(URL, body, setUserInfo, setIsAuth, setError, goTo) {
    const res = await authReq(URL, body);
    UserModel.auth(res, setUserInfo, setIsAuth, setError, goTo);
}