import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../Images/logo.png";

export default function Navbar() {
  const [toggleMenuBtn, setToggleMenuBtn] = useState(true);

  useEffect(() => {
    var leftPanel = document.querySelector(".leftPanel");
    var content = document.querySelector(".content");
    if (!toggleMenuBtn) {
      leftPanel.style.width = "5.5em";
      content.style.width = "calc(100vw - 5.5em)";
      content.style.left = "5.5em";
    } else {
      leftPanel.style.width = "20vw";
      content.style.width = "calc(100vw - 20vw)";
      content.style.left = "20vw";
    }
  }, [toggleMenuBtn]);

  return (
    <nav className="contentNav">
      {toggleMenuBtn ? (
        <IconButton className="MenuBtn" onClick={() => setToggleMenuBtn(false)}>
          <MenuIcon className="MenuIcon" />
        </IconButton>
      ) : (
        <IconButton className="MenuBtn" onClick={() => setToggleMenuBtn(true)}>
          <CloseIcon className="MenuIcon" />
        </IconButton>
      )}

      <img src={Logo} className="logo" />
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
  );
}
