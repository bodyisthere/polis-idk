import React from "react";

import { MyContext } from "../../App";

function AvatarDrop( {goTo, isDropOpen, signOut} ) {

    const { setUserInfo, setIsAuth } = React.useContext(MyContext);
    
    const onClick = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        goTo('/');
        setUserInfo("");
    }

    return (
        <ul ref={signOut} className={`header__drop-menu ${isDropOpen}`}>
            <li>
                  <button className="header__drop-button" onClick={onClick}>Выйти</button>
            </li>
        </ul>
    )
}

export default AvatarDrop;