import React from 'react';
import { useNavigate } from 'react-router-dom'

import './NewPost.scss'

import { MyContext } from "../../App";

export function NewPost() {
    const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext);

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

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const res = await fetch('http://localhost:4444/upload', {
                method: 'post',
                body: formData,
                headers: {
                    authorization: localStorage.getItem('token')
                },
            })

            if(!res.ok) {
                setIsPopOpen('declined');
                setPopMessage('Загрузите корректное изображение');
                setTimeout(() => setIsPopOpen(false), 5000);
                throw new Error(res.message)
            }

            const resJson = await res.json();
            setCover(resJson.url);
            setIsPopOpen('success');
            setTimeout(() => setIsPopOpen(false), 5000);
        } catch (err) {
            console.log(err)
        }
    }

    const sendPost = async () => {
        const res = await fetch('http://localhost:4444/posts', {
            method: "post",
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: `${localStorage.getItem("token")}`,
            },
          });

        if(!res.ok) {
            const json = await res.json();
            setError(json);
            setPopMessage('Не удалось загрузить пост')
            setIsPopOpen('declined');
            return;
        }
        const json = await res.json();

        let { posts, ...other } = userInfo;

        posts.unshift(json._id);

        setUserInfo({
        ...other,
        posts
        })

        setIsPopOpen('success');
        setTimeout(() => setIsPopOpen(false), 5000);

        return goTo(`/page/${userInfo._id}`);;
    }
 

    return (
        <div className="new-post">
            <div className="new-post__container">
                <label>Загрузить превью<input onChange={handleChangeFile} type="file" name="image" accept="image/png, image/jpeg"/></label>
                <input type="title" className={error[0]?.param === 'title' || error[1]?.param === 'title' ? 'new-post__error' : ''} name="title" placeholder='Заголовок'onChange={e => setTitle(e.target.value)} value={title}/>
                <textarea name="text" className={error[0]?.param === 'text' || error[1]?.param === 'text' ? 'new-post__error' : ''} placeholder='Введите текст статьи' onChange={e => setText(e.target.value)} value={text}></textarea>
                <button className="new-post__submit" onClick={sendPost}>Отправить</button>
            </div>
        </div>
    )
}
