import React from "react";
import LeftPanel from "./LeftPanel";
import Content from "./Content";
import ABESIT from "../Images/abesit.png";

export default function Main() {
  return (
    <>
      <img src={ABESIT} className="CompanyLogo" />
      <LeftPanel />
      <Content />
    </>
  );
}
