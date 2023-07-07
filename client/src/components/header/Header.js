import React from "react";
import "./header.css";

const Header = ({ nav, direction, handleDisplayChange, ...props }) => (
  <header>
    <nav className={["navbar", `navbar--${direction}`].join(" ")}>
      <a href={"Home"} onClick={() => handleDisplayChange("Home")}>
        Home
      </a>
      <a href={"Profile"} onClick={() => handleDisplayChange("Profile")}>
        Profile
      </a>
      <a href={"Calendar"} onClick={() => handleDisplayChange("Calendar")}>
        Calendar
      </a>
      <a href={"Goal"} onClick={() => handleDisplayChange("Goal")}>
        Goal
      </a>
    </nav>
  </header>
);

export default Header;
