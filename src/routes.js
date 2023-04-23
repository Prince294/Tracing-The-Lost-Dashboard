import React, { useEffect, useState } from "react";
import Main from "./Components/Main";
import Login from "./Components/Login";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import http from "./Components/Services/utility";
import { apisPath } from "./Components/Utils/path";
import Home from "./Components/Home/Home";
import UserIdVerification from "./Components/UserIdVerification/UserIdVerification";
import Setting from "./Components/Setting";

export default function Router() {
  // const [auth, setAuth] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    validateLogin();
  }, []);

  const validateLogin = async () => {
    const pathName = window?.location?.pathname;
    // console.log(pathName);
    if (localStorage.getItem("session")) {
      await http
        .post(apisPath?.admin?.validateLogin, {
          session: localStorage.getItem("session"),
        })
        .then((res) => {
          if (pathName === "/login" || !pathName?.startsWith("/dashboard/")) {
            return navigate("/dashboard");
          }
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

      <Route path="/dashboard" element={<Main />}>
        <Route path="home" element={<Home />} />
        <Route path="verification" element={<UserIdVerification />} />
        <Route path="setting" element={<Setting />} />

        <Route
          path="logout"
          element={<Navigate to="/login" replace={true} />}
        />

        <Route path="" element={<Navigate to="home" />} />
        <Route path="*" element={<Navigate to="home" />} />
      </Route>
    </Routes>
  );
}
