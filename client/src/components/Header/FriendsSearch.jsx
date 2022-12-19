import React from 'react';
import { Link } from 'react-router-dom'

import './FriendSearch.scss'
import { UserController } from '../../controllers/index.js';


function FriendSearch( { searchValue, setOpenSearch, rootElFirst } ) {
    const [foundPeople, setFoundPeople] = React.useState('');

    React.useEffect(() => {
        UserController.getByName(searchValue, setFoundPeople)
    }, [searchValue])

    const rootElSecond = React.useRef(null);
   
    React.useEffect(() => {
        const onClick = e => {
            if(!(rootElSecond.current.contains(e.target) || rootElFirst.current.contains(e.target))) setOpenSearch(false);
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick)
    }, [])
    
    return (
        <div className="friend-search" ref={rootElSecond}>
            {foundPeople 
            ? 
            foundPeople.map(el => {
                return (
                    <Link to={`/page/${el._id}`} className="friend-search-card" key={el._id} onClick={() => setOpenSearch(false)}>
                        <img src={`http://localhost:4444/uploads/${el.avatarUrl}`} alt={el.fullName} className="friend-search-card__avatar"></img>
                        <div className="friend-search-card__name">{el.fullName}</div>
                    </Link>
                )
            }) 
            : 
            <div className="friend-search-text">Введите человека, которого вы хотите найти</div>
            }
        </div>
    )
}

export default FriendSearch;