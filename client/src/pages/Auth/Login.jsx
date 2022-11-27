import React from "react";

function Login({
  email,
  setEmail,
  password,
  setPassword,
  error,
  setLog,
  authSubmit,
}) {
  return (
    <>
      <div className="auth__title">Авторизуйтесь</div>
      <div className="auth__inputs">
        <span
          className={`auth__error ${
            error.message === "Неверный логин или пароль"
              ? "auth__error--active"
              : ""
          } `}
        >
          Неверный логин или пароль
        </span>
        <span
          className={`auth__error ${
            error.message === "Пользователь не найден"
              ? "auth__error--active"
              : ""
          } `}
        >
          Пользователь не найден
        </span>
        <input
          className={`auth__text-input ${
            error[0] || error[1] === "email" ? "auth__text-input--error" : null
          }`}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`auth__text-input ${
            error[0] || error[1] === "password"
              ? "auth__text-input--error"
              : null
          }`}
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="auth__submit"
          onClick={() => authSubmit("http://localhost:4444/auth/login")}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
      <button
        className="auth__reg"
        onClick={() => {
          setLog(true);
        }}
      >
        Регистрация
      </button>
    </>
  );
}

export default Login;
