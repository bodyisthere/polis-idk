import React from "react";

import "./App.scss";

import Navigation from "./navigation/Navigation";
import { Header, PopUp, FullPost, NotificationsPop } from "./components/index.js";

import { UserController, PostController, SocketController } from './controllers/index.js'
import { useNavigate } from "react-router-dom";

export const MyContext = React.createContext("");

function App() {

  //ключевые переменные информации
  const [userInfo, setUserInfo] = React.useState();
  const [guest, setGuest] = React.useState();
  const [currentPost, setCurrentPost] = React.useState('');
  const [notifications, setNotifications] = React.useState([]);
  const [messages, setMessages] = React.useState('');
  const [postInfo, setPostInfo] = React.useState();
  
  //переменные вспомогательные
  const [isPopOpen, setIsPopOpen] = React.useState(false);
  const [isPostOpen, setIsPostOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isPostFromOpen, setIsPostFromOpen] = React.useState(false);
  
  //доступ к внешнему socket
  const socket = React.useRef();

  //функция навигации
  const navigate = useNavigate();
  const goTo = (url) => navigate(url);

  React.useEffect(() => {
    if(localStorage.getItem('token')) {
      UserController.tokenAuth(setUserInfo, setIsAuth, setIsLoading);
      SocketController.connection(isAuth, socket, setNotifications, setIsConnected, setMessages)
    } else {
      goTo('/');
      setIsLoading(false);
    }
  }, []);
  
  const openPost = (id) => {
    PostController.getPostById(id, setPostInfo);
    setIsPostFromOpen(true);
  }

  return (
    <div className="App">
      {isPostFromOpen ? <FullPost setIsPostFromOpen={setIsPostFromOpen} postInfo={postInfo} setPostInfo={setPostInfo} setIsPostOpen={setIsPostOpen}></FullPost> : ''}
      <NotificationsPop notifications={notifications} setNotifications={setNotifications}/>
      {isPopOpen ? <PopUp isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen}/> : ""}
      <MyContext.Provider value={
        { 
        userInfo, setUserInfo, 
        setIsPopOpen, 
        guest, setGuest, 
        isAuth, setIsAuth, 
        isPostOpen, setIsPostOpen, 
        currentPost, setCurrentPost, 
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
