import React from "react";

import { MyContext } from "../../../App";
import { UserController } from "../../../controllers";

export function MyAvatar() {
    const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext);

    const inputFileRef = React.useRef(null);

    const onChange = (e) => {
        UserController.changeAvatar(e, setPopMessage, setIsPopOpen, userInfo, setUserInfo)
    }

    return (
        <div className="preview-profile__background-change">
            <input 
                type="file" 
                name="image" 
                className="preview-profile__file-upload" 
                accept="image/jpeg,image/png" 
                onChange={onChange} 
                ref={inputFileRef} 
                hidden />
            <i 
                title="Изменить аватар" 
                className="fa-solid fa-pen" 
                onClick={() => inputFileRef.current.click()}>
            </i>
        </div>
    )
}