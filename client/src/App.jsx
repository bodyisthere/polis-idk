import React from "react";

import "./App.scss";

import Navigation from "./navigation/Navigation";
import { Header, PopUp, FullPost, NotificationsPop } from "./components/index.js";
import { getPostById } from "./http/http.js";

import { UserController, PostController, SocketController } from './controllers/index.js'

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
  
  const [ isConnected, setIsConnected ] = React.useState(false);
  const [messages, setMessages] = React.useState('')

  React.useEffect(() => {
    UserController.tokenAuth(setUserInfo, setIsAuth, setIsLoading);
    SocketController.connection(isAuth, socket, setNotifications, setIsConnected, setMessages)
  }, []);
  
  const socket = React.useRef();

  const [ isPostFromOpen, setIsPostFromOpen ] = React.useState(false);

  const [ postInfo, setPostInfo ] = React.useState()

  const openPost = (id) => {
    PostController.getPostById(id, setPostInfo);
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
        socket,
        isConnected, setIsConnected,
        messages, setMessages,
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
