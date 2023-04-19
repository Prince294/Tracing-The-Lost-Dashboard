import React from "react";
import LeftPanel from "./LeftPanel";
import ABESIT from "../Images/abesit.png";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../ComponentCss/Content.css";

export default function Main() {
  return (
    <>
      <img src={ABESIT} className="CompanyLogo" />
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
