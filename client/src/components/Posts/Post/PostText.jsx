import React from "react";

export function PostText( {postInfo} ) {
    const [showText, setShowText] = React.useState(true);

    return (
        <div className="post__text">
          <div className="post__title">{postInfo.post.title}</div>
          <div className="post__subtitle">
            {postInfo.post.text.length > 300 && showText
            ?
            <>
              {postInfo.post.text.substr(0, 300)}
              <button className="post__show-all" onClick={() => setShowText(false)}>Показать весь текст...</button>
            </>
            : 
            postInfo.post.text}
          </div>
        </div>
    )
}