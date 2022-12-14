export function isTheyFriend(userInfo, guest) {
    let isThey = false;
    const length = userInfo.friendList.length;
    let i = 0;
    
    if(length >= 1) {
      while( !isThey && length >= i + 1) {
        if(userInfo.friendList[i]._id === guest._id) {
          isThey = true;
          return true;
        }
        i = i + 1;
      }
    }
    if(!isThey) {
      return false;
    } 
  }