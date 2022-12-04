import React from "react";

import "./Page.scss";

import { MyPreviewProfile, FriendsList, Suggestions, Posts, AddNewPost } from '../../components/index.js'


export function Page() {
  return (
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
  );
}

