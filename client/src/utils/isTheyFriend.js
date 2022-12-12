export function isTheyFriend(userInfo, guest, setFriendText) {
    let isThey = false;
    const length = userInfo.friendList.length;
    let i = 0;
    
    if(userInfo.friendList.length >= 1) {
      while( !isThey && length >= i + 1) {
        if(userInfo.friendList[i]._id === guest._id) {
          isThey = true;
          return setFriendText('Удалить из друзей');
        }
        i = i + 1;
      }
    }
    if(!isThey) {
      return setFriendText('Добавить в друзья')
    } 
  }