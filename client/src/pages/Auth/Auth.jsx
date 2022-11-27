import React from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.scss";

import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import { MyContext } from "../../App";

export function Auth({ isAuth }) {
  const { setUserInfo, userInfo, setIsAuth } = React.useContext(MyContext);

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [body, setBody] = React.useState("");

  const [log, setLog] = React.useState(false);
  const [error, setError] = React.useState("");

  const goTo = (url) => navigate(url);

  React.useEffect(() => {
    if (isAuth) {
      goTo(`/page/${userInfo._id}`);
    }
    setBody({
      fullName,
      email,
      password,
    });
  }, [email, password, fullName]);

  React.useEffect(() => {
    if (isAuth) {
      goTo(`/page/${userInfo._id}`);
    }
  }, [])
  

  const navigate = useNavigate();

  const authSubmit = async (URL) => {
    const res = await fetch(URL, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err);
      throw new Error(`${res.statusText}`);
    }

    const info = await res.json();
    setUserInfo(info);
    setIsAuth(true);
    localStorage.setItem("token", info.token);
    setError("");
    return info._id ? goTo(`/page/${info._id}`) : ''
  };

  return (
    <div className="auth">
      <div className="auth__form">
        {log ? (
          <Registration
            setLog={setLog}
            setFullName={setFullName}
            fullName={fullName}
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            error={error}
            setError={setError}
            body={body}
            setBody={setBody}
            authSubmit={authSubmit}
          />
        ) : (
          <Login
            setLog={setLog}
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            error={error}
            setError={setError}
            body={body}
            setBody={setBody}
            authSubmit={authSubmit}
          />
        )}
      </div>
    </div>
  );
}

