import React from 'react';
import { useNavigate } from 'react-router-dom'

import './NewPost.scss'

import { MyContext } from "../../App";
import { handleChangeFile } from '../../http/httpUniversal.js';
import { PostController } from '../../controllers';

export function NewPost() {
    const { userInfo, setUserInfo, setIsPopOpen } = React.useContext(MyContext);

    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [cover, setCover] = React.useState('');
    const [body, setBody] = React.useState('');

    const [error, setError] = React.useState('');

    const navigate = useNavigate();
    const goTo = (url) => navigate(url);

    React.useEffect(() => {
        setBody({
            text,
            title,
            cover
        })
    }, [text, title, cover])

    const handleChangeCover = async (e) => {
        PostController.uploadCover(e, setIsPopOpen, setCover);
    }

    const sendPost = async () => {
        PostController.addNewPost(body, setError, setIsPopOpen, userInfo, setUserInfo, goTo)
    }
 

    return (
        <div className="new-post">
            <div className="new-post__container">
                <div className="new-post__buttons">
                    <button onClick={() => goTo(-1)}><i className="fa-solid fa-chevron-left"></i></button>
                    <label>Загрузить превью<input onChange={handleChangeCover} type="file" name="image" accept="image/png, image/jpeg"/></label>
                </div>
                <input type="title" className={error[0]?.param === 'title' || error[1]?.param === 'title' ? 'new-post__error' : ''} name="title" placeholder='Заголовок'onChange={e => setTitle(e.target.value)} value={title}/>
                <textarea name="text" className={error[0]?.param === 'text' || error[1]?.param === 'text' ? 'new-post__error' : ''} placeholder='Введите текст статьи' onChange={e => setText(e.target.value)} value={text}></textarea>
                <button className="new-post__submit" onClick={sendPost}>Отправить</button>
            </div>
        </div>
    )
}
