import React, { useEffect, useState } from "react";
import "../ComponentCss/Login.css";
import http from "./Services/utility";
import { apisPath } from "./Utils/path";
import { Outlet, Link, redirect, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email_username, setEmail_username] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    ValidateLogin();
  }, []);

  const ValidateLogin = async () => {
    if (localStorage.getItem("session")) {
      await http
        .post(apisPath?.admin?.validateLogin, {
          session: localStorage.getItem("session"),
        })
        .then((res) => {
          return navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          // setErrMessage(err?.response?.data?.message);
        });
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email_username)) {
      await http
        .post(apisPath?.admin?.login, {
          email: email_username,
          password: password,
        })
        .then((res) => {
          console.log(res?.data);
          localStorage.setItem("session", res?.data?.session_id);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          // setErrMessage(err?.response?.data?.message);
        });
    } else {
      await http
        .post(apisPath?.admin?.login, {
          username: email_username,
          password: password,
        })
        .then((res) => {
          console.log(res?.data);
          localStorage.setItem("session", res?.data?.session_id);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          // setErrMessage(err?.response?.data?.message);
        });
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={loginHandler}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={email_username}
                onChange={(el) => setEmail_username(el?.target?.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(el) => {
                  setPassword(el.target.value);
                }}
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
