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
import { useNavigate } from "react-router-dom";

export default function Content() {
  const navigate = useNavigate();

  const [toggleMenuBtn, setToggleMenuBtn] = useState(true);
  const [toggleHomeTableHeaders, setToggleHomeTableHeaders] = useState(0);
  const [hoverActivePanelTabs, setHoverActivePanelTabs] = useState(0);

  useEffect(() => {
    //Adding a class on click listItems
    var listItems = document.querySelectorAll(".hoverItems");
    function addingClass() {
      if (Array.from(this.parentNode.children).indexOf(this) === 3) {
        localStorage.removeItem("session");
        setHoverActivePanelTabs(0);
        return navigate("/login");
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

    //Home List on click event
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
  }, []);

  var leftPanel = document.querySelector(".leftPanel");
  var content = document.querySelector(".content");
  const handleMenuExpand = () => {
    setToggleMenuBtn(false);

    leftPanel.style.width = "5.5em";
    content.style.width = "calc(100vw - 5.5em)";
    content.style.left = "5.5em";
  };

  const handleMenuCollapse = () => {
    setToggleMenuBtn(true);

    leftPanel.style.width = "20vw";
    content.style.width = "calc(100vw - 20vw)";
    content.style.left = "20vw";
  };

  return (
    <div className="content">
      <nav className="contentNav">
        {toggleMenuBtn ? (
          <IconButton className="MenuBtn" onClick={handleMenuExpand}>
            <MenuIcon className="MenuIcon" />
          </IconButton>
        ) : (
          <IconButton className="MenuBtn" onClick={handleMenuCollapse}>
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
