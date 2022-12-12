import React from "react";

import "./App.scss";

import Navigation from "./navigation/Navigation";
import { Header, PopUp, FullPost, NotificationsPop } from "./components/index.js";
import { getPostById, tokenAuth } from "./http/http.js";
import { socketConnection } from "./socket/socket";

export const MyContext = React.createContext("");

function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [guest, setGuest] = React.useState();

  const [isPopOpen, setIsPopOpen] = React.useState(false);
  const [popMessage, setPopMessage] = React.useState('');

  const [notifications, setNotifications] = React.useState([]);

  const [isAuth, setIsAuth] = React.useState(false);
  const [isPostOpen, setIsPostOpen] = React.useState(false);

  const [currentPost, setCurrentPost] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    tokenAuth(setUserInfo, setIsLoading, setIsAuth);
    socketConnection(isAuth, socket, setNotifications);
  }, []);
  
  const socket = React.useRef();

  const [ isPostFromOpen, setIsPostFromOpen ] = React.useState(false);

  const [ postInfo, setPostInfo ] = React.useState()

  const openPost = (id) => {
    getPostById(id, setPostInfo)
    setIsPostFromOpen(true);
}

  return (
    <div className="App">
      {isPostFromOpen ? <FullPost setIsPostFromOpen={setIsPostFromOpen} postInfo={postInfo} setPostInfo={setPostInfo} setIsPostOpen={setIsPostOpen}></FullPost> : ''}
      <NotificationsPop notifications={notifications} setNotifications={setNotifications}/>
      {isPopOpen ? <PopUp isPopOpen={isPopOpen} popMessage={popMessage}/> : ""}

      <MyContext.Provider value={
        { 
        userInfo, setUserInfo, 
        setIsPopOpen, 
        guest, setGuest, 
        isAuth, setIsAuth, 
        isPostOpen, setIsPostOpen, 
        currentPost, setCurrentPost, 
        setPopMessage, 
        openPost, 
        socket 
        }}
      >
        {isLoading 
        ?
          <div className="loader"></div>
        : 
        <>
          <Header />
          <Navigation isAuth={isAuth}/>
        </>
        }
      </MyContext.Provider>
    </div>
  );
}

export default App;
