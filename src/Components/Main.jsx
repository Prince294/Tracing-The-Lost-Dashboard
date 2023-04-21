import React from "react";
import LeftPanel from "./LeftPanel";
import Logo from "../Images/logo.png";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../ComponentCss/Content.css";

export default function Main() {
  return (
    <>
      <img src={Logo} className="watermarkLogo" />
      <div className="leftPanel">
        <LeftPanel />
      </div>
      <div className="content">
        <Navbar />
        <hr className="partitionHr" />
        <Outlet />
      </div>
    </>
  );
}
