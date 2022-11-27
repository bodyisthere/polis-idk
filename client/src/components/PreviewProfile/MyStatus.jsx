import React from "react";

import { MyContext } from "../../App";

function MyStatus() {
  const { userInfo, setUserInfo, setIsPopOpen, setPopMessage } = React.useContext(MyContext);

  const [statusChange, setStatusChange] = React.useState(false);
  const [statusText, setStatusText] = React.useState("");

  const submitStatus = async () => {
    try {
      if (statusText === "") {
        setPopMessage('Статус не может быть пуст');
        setIsPopOpen('declined');
        setTimeout(() => setIsPopOpen(false), 5000)
        return setStatusChange(false);
      }

      const res = await fetch("http://localhost:4444/status-set", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          status: statusText,
        }),
      });

      if (!res.ok) {
        const resJson = await res.json()
        setPopMessage(resJson.message);
        throw new Error(resJson?.message);
      }


      const { status, ...other } = userInfo;
      setUserInfo( {
        ...other,
        status: statusText
      })
      setStatusChange(false);
      setIsPopOpen('success');
      setTimeout(() => setIsPopOpen(false), 5000)
      return setStatusText('');
    } catch (err) {
      setIsPopOpen('declined')
      return setTimeout(() => setIsPopOpen(false), 5000);
    }
  };

    return ( statusChange 
      ? 
      <>
        <input type="text"  className="preview-profile__status-change" placeholder="Изменить статус..." value={statusText} onChange={(e) => setStatusText(e.target.value)} maxLength="100" />
        <button className="preview-profile__status-submit" onClick={submitStatus} ><i className="fa-regular fa-circle-check"></i></button>
      </>
      :
      <div title="Изменить статус" className="preview-profile__status" onClick={() => (userInfo ? setStatusChange(true) : setIsPopOpen(true))} >{userInfo?.status ? userInfo.status : "Поставьте статус.."}</div>
    )
}

export default MyStatus;