import React from "react";
import "../ComponentCss/LeftPanel.css";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";

const PanelItems = (props) => {
  return (
    <li
      className={`hoverItems ${props.logo === "HomeIcon" ? "aciveItem" : ""}`}
    >
      {props.logo === "HomeIcon" ? (
        <HomeIcon className="itemLogo" />
      ) : props.logo === "MessageIcon" ? (
        <MessageIcon className="itemLogo" />
      ) : props.logo === "SettingsIcon" ? (
        <SettingsIcon className="itemLogo" />
      ) : props.logo === "LogoutIcon" ? (
        <LogoutIcon className="itemLogo" />
      ) : (
        ""
      )}
      <h1 className="leftPanelHeading">{props.name}</h1>
    </li>
  );
};

export default function LeftPanel() {
  return (
    <div className="leftPanel">
      <div className="companyLogo">
        {/* <img src={ABESIT} className="itemLogo" /> */}
        <SchoolIcon className="itemLogo" />
        <h1>TTL - Support</h1>
      </div>
      <ul>
        {[
          { logo: "HomeIcon", name: "Home" },
          { logo: "MessageIcon", name: "Dr. Verification" },
          { logo: "SettingsIcon", name: "Block Doctor" },
          { logo: "LogoutIcon", name: "Logout" },
        ].map((item) => {
          return (
            <PanelItems key={item.logo} logo={item.logo} name={item.name} />
          );
        })}
      </ul>
    </div>
  );
}
