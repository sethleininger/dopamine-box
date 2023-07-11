import React from "react";
import "./header.css";

const Header = ({ nav, direction, handlePageChange, ...props }) => (
  <header>
    <nav className={["navbar", `navbar--${direction}`].join(" ")}>
      <a href={"#welcome"} onClick={() => handlePageChange("Welcome")}>
        Home
      </a>
      <a href={"#profile"} onClick={() => handlePageChange("Profile")}>
        Profile
      </a>
      <a href={"#calendar"} onClick={() => handlePageChange("Calendar")}>
        Calendar
      </a>
      <a href={"#creategoal"} onClick={() => handlePageChange("CreateGoal")}>
        Goal
      </a>
      {/* <a href={'#login'} onClick={() => handlePageChange('Login')}> Login</a>
      
      <a href={'#signup'} onClick={() => handlePageChange('Signup')}> Signup</a> */}
      <a href={'#authform'} onClick={() => handlePageChange('AuthForm')}>Signup/Login</a>
    </nav>
  </header>
);

export default Header;
