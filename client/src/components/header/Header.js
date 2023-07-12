import React from "react";
import "./header.css";
import Auth from '../../utils/auth';

import home from "../../assets/home2.png";
import profile from "../../assets/profile.png";
import calendar from "../../assets/calendar.png";
import goal from "../../assets/createGoal.png";
import login from "../../assets/login.png";
import logout from "../../assets/logout.png";

const signedIn = Auth.loggedIn();
const logOut = () => {
  Auth.logout()
  };

const Header = ({ nav, direction, handlePageChange, ...props }) => {
  if (signedIn) {
    return (
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
            <a href="#welcome" onClick={logOut}>
              <span className="icon">
                <img src={logout} alt="" />
              </span>
              <span className="pageName">
                Logout
              </span>
            </a>            
          </div>
        </nav>
      </header>
    );
  } else if (!signedIn) {
    return (
      <header className="header2">
        <nav className={["navbar", `navbar--${direction}`].join(" ")}>
          <a href={"#welcome"} onClick={() => handlePageChange("Welcome")}>
            <span className="icon">
              <img src={home} alt="" />
            </span>
            <span className="pageName">
              Home
            </span>
          </a>
          <a href={'#authform'} onClick={() => handlePageChange('AuthForm')}>
            <span className="icon">
              <img  src={login} alt="" />
            </span>
            <span className="pageName">
              Signup/Login
            </span>
          </a>
        </nav>
      </header>
    );
  }
};

export default Header;
