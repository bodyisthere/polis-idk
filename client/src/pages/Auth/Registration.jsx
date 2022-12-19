import React from "react";

function Registration({
  email,
  setEmail,
  password,
  setPassword,
  body,
  setBody,
  error,
  setLog,
  fullName,
  setFullName,
  authSubmit,
}) {

  return (
    <>
      <div className="auth__title">Регистрация</div>
      <div className="auth__inputs">
        <span
          className={`auth__error-reg ${
            error ? "auth__error-reg--active" : null
          }`}
        >
          {error.length > 0 ? error.map((el) => el.msg + ", ") : null}
          {error?.message ? error.message : null}
        </span>
        <input
          className={`auth__text-input ${
            error[0] || error[1] || error[2] === "fullName"
              ? "auth__text-input--error"
              : null
          }`}
          type="text"
          name="fullName"
          placeholder="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className={`auth__text-input ${
            error[0] || error[1] || error[2] === "email"
              ? "auth__text-input--error"
              : null
          }`}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`auth__text-input ${
            error[0] || error[1] || error[2] === "password"
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
          onClick={() => authSubmit("http://localhost:4444/auth/registration")}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
      <button className="auth__reg" onClick={() => setLog(false)}>
        Войти
      </button>
    </>
  );
}

export default Registration;
