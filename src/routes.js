import React, { useEffect, useState } from "react";
import Main from "./Components/Main";
import Login from "./Components/Login";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import http from "./Components/Services/utility";
import { apisPath } from "./Components/Utils/path";

export default function Router() {
  const navigate = useNavigate();

  useEffect(() => {
    validateLogin();
  }, []);

  const validateLogin = async () => {
    if (localStorage.getItem("session")) {
      await http
        .post(apisPath?.admin?.validateLogin, {
          session: localStorage.getItem("session"),
        })
        .then((res) => {
          return navigate("/home");
        })
        .catch((err) => {
          return navigate("/login");
        });
    } else {
      return navigate("/login");
    }
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/home" element={<Main />} />
    </Routes>
  );
}
