import React from "react";
import "./header.css";

import home from "../../assets/home.png";
import profile from "../../assets/profile.png";
import calendar from "../../assets/calendar.png";
import goal from "../../assets/createGoal.png";
import login from "../../assets/login.png";

const Header = ({ nav, direction, handlePageChange, ...props }) => (
  <header>
    <nav className={["navbar", `navbar--${direction}`].join(" ")}>
      <div>
        <a href={"#welcome"} onClick={() => handlePageChange("Welcome")}>
          <span className="icon">
            <img src={home} alt="" />
          </span>
          <span className="pageName">
            Home
          </span>
        </a>
        <a href={"#profile"} onClick={() => handlePageChange("Profile")}>
        <span className="icon">
            <img src={profile} alt="" />
          </span>
          <span className="pageName">
            Profile
          </span>
        </a>
        <a href={"#calendar"} onClick={() => handlePageChange("Calendar")}>
          <span className="icon">
            <img src={calendar} alt="" />
          </span>
          <span className="pageName">
            Calendar
          </span>
        </a>
        <a href={"#creategoal"} onClick={() => handlePageChange("CreateGoal")}>
          <span className="icon">
            <img src={goal} alt="" />
          </span>
          <span className="pageName">
            Goal
          </span>
        </a>
      </div>
      <div>
        <a href={'#authform'} onClick={() => handlePageChange('AuthForm')}>
          <span className="icon">
            <img  src={login} alt="" />
          </span>
          <span className="pageName">
            Signup/Login
          </span>
        </a>
      </div>
      
    </nav>
  </header>
);

export default Header;
