import React, { useEffect, useState } from "react";
import "../ComponentCss/Content.css";
import Home from "./Home";
import Message from "./Message";
import Setting from "./Setting";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ABESIT from "../Images/abesit.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const navigate = useNavigate();

  const [toggleMenuBtn, setToggleMenuBtn] = useState(1);
  const [toggleHomeTableHeaders, setToggleHomeTableHeaders] = useState(0);
  const [hoverActivePanelTabs, setHoverActivePanelTabs] = useState(0);

  useEffect(() => {
    var hamBurger = document.querySelector(".MenuBtn");
    var leftPanel = document.querySelector(".leftPanel");
    var leftPanelUl = document.querySelector(".leftPanel ul");
    var content = document.querySelector(".content");

    hamBurger.addEventListener("click", () => {
      if (toggleMenuBtn === 1) {
        leftPanel.style.width = "5.7vw";
        content.style.width = "calc(100vw - 5.7vw)";
        content.style.left = "5.7vw";

        setToggleMenuBtn(0);
      } else {
        leftPanel.style.width = "20vw";
        content.style.width = "calc(100vw - 20vw)";
        content.style.left = "20vw";
        setToggleMenuBtn(1);
      }
    });

    //Adding a class on click listItems
    var listItems = document.querySelectorAll(".hoverItems");
    function addingClass() {
      if (Array.from(this.parentNode.children).indexOf(this) === 3) {
        localStorage.removeItem("session");
        setHoverActivePanelTabs(0);
        return navigate("/");
      } else {
        listItems.forEach((item) => {
          item.classList.remove("aciveItem");
        });
        this.classList.add("aciveItem");
        setHoverActivePanelTabs(
          Array.from(this.parentNode.children).indexOf(this)
        );
      }
    }

    listItems.forEach((item) => {
      item.addEventListener("click", addingClass);
    });

    //Home List Hover Underline
    var homeListItems = document.querySelectorAll(".homeMenu ul li");
    var line = document.querySelectorAll(".homeMenu ul li .line");
    function mouseOverHomeListItems() {
      line.forEach((item) => {
        item.classList.remove("after");
      });
      let linee = this.querySelector(".line");
      linee.classList.add("after");
      setToggleHomeTableHeaders(
        Array.from(this.parentNode.children).indexOf(this)
      );
    }

    homeListItems.forEach((item) => {
      item.addEventListener("click", mouseOverHomeListItems);
    });

    //Dropdown Teachers Name
    let dropDownUl = document.querySelectorAll(".dropdownNameSelection");

    for (let dropUl of dropDownUl) {
      dropUl.addEventListener("click", () => {
        let DropDownDiv = dropUl.querySelector("div");
        if (DropDownDiv.style.display === "none") {
          DropDownDiv.style.display = "block";
        } else {
          DropDownDiv.style.display = "none";
        }
      });
    }
  });

  return (
    <div className="content">
      <nav className="contentNav">
        {toggleMenuBtn === 1 ? (
          <IconButton className="MenuBtn">
            <MenuIcon className="MenuIcon" />
          </IconButton>
        ) : (
          <IconButton className="MenuBtn">
            <CloseIcon className="MenuIcon" />
          </IconButton>
        )}

        <img src={ABESIT} className="logo" />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            borderRadius: 50,
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </nav>
      <hr className="partitionHr" />
      {hoverActivePanelTabs === 0 ? (
        <Home toggleHomeTableHeaders={toggleHomeTableHeaders} />
      ) : hoverActivePanelTabs === 1 ? (
        <Message />
      ) : hoverActivePanelTabs === 2 ? (
        <Setting />
      ) : (
        ""
      )}
    </div>
  );
}
