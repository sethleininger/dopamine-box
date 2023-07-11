import React from "react";
import "./header.css";
import Auth from '../../utils/auth';

const signedIn = Auth.loggedIn();
const logOut = () => {
  Auth.logout()
  };

const Header = ({ nav, direction, handlePageChange, ...props }) => {
  if (signedIn) {
    return (
      <header>
        <nav className={["navbar", `navbar--${direction}`].join(" ")}>
          <a href="#profile" onClick={() => handlePageChange("Profile")}>
            Profile
          </a>
          <a href="#calendar" onClick={() => handlePageChange("Calendar")}>
            Calendar
          </a>
          <a href="#creategoal" onClick={() => handlePageChange("CreateGoal")}>
            Goal
          </a>
          <a href="#welcome" onClick={logOut}>
            Logout
          </a>
        </nav>
      </header>
    );
  } else if (!signedIn) {
    return (
      <header>
        <nav className={["navbar", `navbar--${direction}`].join(" ")}>
          <a href="#welcome" onClick={() => handlePageChange("Welcome")}>
            Home
          </a>
          <a href="#authform" onClick={() => handlePageChange("AuthForm")}>
            Signup/Login
          </a>
        </nav>
      </header>
    );
  }
};

export default Header;
