import React from "react";
import { Link } from "react-router-dom";

import { MyContext } from "../../App";

function Friend( { _id, fullName, avatarUrl} ) {
    const { setGuest } = React.useContext(MyContext);

    const getInfoAboutGuest = async (url) => {
        const res = await fetch(`http://localhost:4444/page/${url}`);
        
        if (!res.ok) {
          //error
          return;
        }
        const json = await res.json();
        setGuest(json);
    };

    return (
        <li className="friends-list__item" key={_id}>
            <Link to={`/page/${_id}`} onClick={() => getInfoAboutGuest(_id)}>
                <div className="friends-list__img">
                    <img src={`http://localhost:4444/uploads/${avatarUrl}`} alt={fullName} />
                </div>
                <p>{fullName}</p>
            </Link>
        </li>
    )
}

export default Friend;