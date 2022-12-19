import React from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.scss";

import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import { MyContext } from "../../App";
import { UserController } from "../../controllers";

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
  }, [])

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
  
  const navigate = useNavigate();

  const authSubmit = async (URL) => {
    UserController.auth(URL, body, setUserInfo, setIsAuth, setError, goTo);
  }

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

