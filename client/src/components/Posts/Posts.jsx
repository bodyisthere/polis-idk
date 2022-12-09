import React from "react";

import './Posts.scss'

import { Post } from '../index.js';
import { MyContext } from "../../App.jsx";

export function Posts( { like } ) {
  const { userInfo, guest } = React.useContext(MyContext);

  return (
    <div className="posts">
      
      {userInfo?._id === window.location.pathname.split("/")[2] 
      ?
      userInfo.posts.length >= 1  
        ? 
        userInfo.posts.map((el) => <Post key={el} id={el}/>) 
        : 
        <div className="posts__nothing">Постов нет😔</div>
      : 
      guest.posts.length >= 1 
        ? 
        guest.posts.map((el) => <Post like={like} key={el} id={el}/>) 
        : 
        <div className="posts__nothing">Постов нет😔</div>}
    </div>
  );
}

