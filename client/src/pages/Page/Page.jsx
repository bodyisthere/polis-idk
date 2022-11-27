import React from "react";
import { MyContext } from "../../App";

import "./Page.scss";

import { MyPreviewProfile, FriendsList, Suggestions, Posts, AddNewPost } from '../../components/index.js'


export function Page() {
  const { userInfo, setUserInfo } = React.useContext(MyContext);

  const [ isLoading, setIsLoading ] = React.useState(true)

  // React.useEffect(() => {
  //   fetch(`http://localhost:4444/page/${window.location.pathname.split('/')[2]}`)
  //   .then(data => data.json())
  //   .then(json => {setUserInfo(json); setIsLoading(true)})
  // }, [])

  return (
    isLoading  
    ?
    <div className="page">
      <div className="page__container">
        <div className="page__info">
          <MyPreviewProfile />
          <FriendsList />
        </div>
        <div className="page__posts">
          <AddNewPost />
          <Posts />
        </div>
        <div className="page__suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
    :
    'a'
  );
}

