import { Routes, Route } from "react-router-dom";

import { Pages, Notifications, NoFound, News, Auth, Home, Messages, NewPost, AllFriendsCheck, Conversation } from '../pages/index.js'


function Navigation( { isAuth } ) {
    return (
        <Routes>
          <Route path="/" element={<Auth isAuth={isAuth} />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/page/:id" element={<Pages />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route path="/new-post" element={<NewPost />}></Route>
          <Route path="/all-friends/:id" element={<AllFriendsCheck />}></Route>
          <Route path="/conversation/:id" element={<Conversation />}></Route>
          <Route path="*" element={<NoFound />}></Route>
        </Routes>
    )
}

export default Navigation;