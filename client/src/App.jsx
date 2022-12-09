import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.scss";

import { Header, PopUp } from './components/index.js'
import Navigation from "./navigation/Navigation";
import { NotificationsPop } from "./pages/Notifications/NotificationsPop";

import { io } from 'socket.io-client'

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

  const navigate = useNavigate();
  const goTo = (id) => navigate(`/page/${id}`);

  React.useEffect(() => {
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
  }, []);
  
  const socket = React.useRef();

  const like = (userId, postId, likeCondition) => {
    socket.current.emit('like-send', userId, postId, likeCondition)
  }

  React.useEffect(() => {
    if(!isAuth && socket.current) return;

    socket.current = io('http://localhost:4444', {
      auth: {authorization: localStorage.getItem('token')}
    })

    socket.current.on('liked!', (x) => {
      setNotifications(prev => [...prev, x])
    })

  }, [])

  return (
    <div className="App">
      <NotificationsPop notifications={notifications} setNotifications={setNotifications}/>
      {isPopOpen ? <PopUp isPopOpen={isPopOpen} popMessage={popMessage}/> : ""}
      <MyContext.Provider value={{ userInfo, setUserInfo, setIsPopOpen, guest, setGuest, isAuth, setIsAuth, isPostOpen, setIsPostOpen, currentPost, setCurrentPost, setPopMessage, like}}>
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
