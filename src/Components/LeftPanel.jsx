import React from "react";
import "../ComponentCss/LeftPanel.css";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import VerifiedIcon from "@mui/icons-material/Verified";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";

const PanelItems = (props) => {
  return (
    <Link
      to={props?.url}
      onClick={() => {
        this?.classList.add("activeItem");
        props?.handleClick(props?.index);
      }}
    >
      <li
        className={`hoverItems ${
          props.logo === "HomeIcon" ? "activeItem" : ""
        }`}
      >
        {props.logo}
        <h1 className="leftPanelHeading">{props.name}</h1>
      </li>
    </Link>
  );
};

export default function LeftPanel(props) {
  const navigate = useNavigate();

  const handleClick = (index) => {
    var listItems = document.querySelectorAll(".hoverItems");
    if (index === 3) {
      localStorage.removeItem("session");
      return navigate("/login");
    } else {
      listItems.forEach((item) => {
        if (item.classList.contains("activeItem"))
          item.classList.remove("activeItem");
      });
    }
  };

  return (
    <>
      <div className="companyLogo">
        <SchoolIcon className="itemLogo" />
        <h1>TTL - Support</h1>
      </div>
      <ul>
        {[
          {
            logo: <HomeIcon className="itemLogo" />,
            name: "Home",
            url: "home",
          },
          {
            logo: <VerifiedIcon className="itemLogo" />,
            name: "User ID Verification",
            url: "verification",
          },
          {
            logo: <SettingsIcon className="itemLogo" />,
            name: "Setting",
            url: "setting",
          },
          {
            logo: <LogoutIcon className="itemLogo" />,
            name: "Logout",
            url: "logout",
          },
        ].map((item, index) => {
          return (
            <PanelItems
              key={item?.logo}
              logo={item?.logo}
              name={item?.name}
              url={item?.url}
              index={index}
              handleClick={handleClick}
            />
          );
        })}
      </ul>
    </>
  );
}
