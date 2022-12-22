import React from "react";

import { MyContext } from "../../../App";
import { UserController } from "../../../controllers";

function MyStatus() {
  const { userInfo, setUserInfo, setIsPopOpen } = React.useContext(MyContext);

  const [statusChange, setStatusChange] = React.useState(false);
  const [statusText, setStatusText] = React.useState("");

    return ( statusChange 
      ? 
      <>
        <input 
          className="preview-profile__status-change" 
          type="text" 
          placeholder="Изменить статус..." 
          value={statusText} 
          onChange={(e) => setStatusText(e.target.value)} 
          maxLength="100" 
        />
        <button 
          className="preview-profile__status-submit" 
          onClick={() => UserController.changeStatus(statusText, setIsPopOpen, setStatusChange, userInfo, setUserInfo, setStatusText)}>
            <i className="fa-regular fa-circle-check"></i>
        </button>
      </>
      :
      <div 
        className="preview-profile__status" 
        title="Изменить статус" 
        onClick={() => (userInfo ? setStatusChange(true) : setIsPopOpen(true))}>
          {userInfo?.status ? userInfo.status : "Поставьте статус.."}
      </div>
    )
}

export default MyStatus;