import React from 'react';
import './header.css';
import Auth from '../../utils/auth';

import home from '../../assets/home2.png';
import profile from '../../assets/profile.png';
import calendar from '../../assets/calendar.png';
import goal from '../../assets/createGoal.png';
import login from '../../assets/login.png';
import logout from '../../assets/logout.png';
import install from '../../assets/install.png';

import useSound from 'use-sound';
import relaxClick from '../../assets/sounds/relaxClick.mp3';
import relaxClickTwo from '../../assets/sounds/relaxClick2-1.mp3';
import relaxClickThree from '../../assets/sounds/relaxClick3-1.mp3';
import relaxClickFour from '../../assets/sounds/relaxClick4-1.mp3';
import relaxClickFive from '../../assets/sounds/relaxClick5-1.mp3'



const Header = ({ nav, direction, handlePageChange, ...props }) => {
  const [playOne] = useSound(relaxClick);
  const [playTwo] = useSound(relaxClickTwo);
  const [playThree] = useSound(relaxClickThree);
  const [playFour] = useSound(relaxClickFour);
  // const [playFive] = useSound(relaxClickFive);

  const handleClickOne = (pageName, event) => {
    event.preventDefault();
    handlePageChange(pageName);
    playOne(); // Play the sound on click
  };
  const handleClickTwo = (pageName, event) => {
    event.preventDefault();
    handlePageChange(pageName);
    playTwo(); // Play the sound on click
  };
  const handleClickThree = (pageName, event) => {
    event.preventDefault();
    handlePageChange(pageName);
    playThree(); // Play the sound on click
  };
  const handleClickFour = (pageName, event) => {
    event.preventDefault();
    handlePageChange(pageName);
    playFour(); // Play the sound on click
  };

  const signedIn = Auth.loggedIn();
    const logOut = () => {
      
      Auth.logout();
      // playFive();
    };

  if (signedIn) {
    return (
      <header>
        <nav className={['navbar', `navbar--${direction}`].join(' ')}>
          <div>
            <a
              href="#welcome"
              onClick={(event) => handleClickOne('Welcome', event)}
            >
              <span className="icon">
                <img src={home} alt="" />
              </span>
              <span className="pageName">Home</span>
            </a>
            <a
              href="#profile"
              onClick={(event) => handleClickTwo('Profile', event)}
            >
              <span className="icon">
                <img src={profile} alt="" />
              </span>
              <span className="pageName">Profile</span>
            </a>
            <a
              href="#calendarpage"
              onClick={(event) => handleClickThree('CalendarPage', event)}
            >
              <span className="icon">
                <img src={calendar} alt="" />
              </span>
              <span className="pageName">Calendar</span>
            </a>
            <a
              href="#creategoal"
              onClick={(event) => handleClickFour('CreateGoal', event)}
            >
              <span className="icon">
                <img src={goal} alt="" />
              </span>
              <span className="pageName">Goal</span>
            </a>
          </div>
          <div>
            <a href="#welcome" role="button" id="buttonInstall">
              <span className='icon'>
                <img src={install} alt="" />
              </span>
              <span className="pageName">Install</span>
            </a>
            <a href="#welcome" onClick={logOut}>
              <span className="icon">
                <img src={logout} alt="" />
              </span>
              <span className="pageName">Logout</span>
            </a>
          </div>
        </nav>
      </header>
    );
  } else if (!signedIn) {
    return (
      <header className="header2">
        <nav className={['navbar', `navbar--${direction}`].join(' ')}>
          <a href="#welcome" onClick={(event) => handleClickOne('Welcome', event)}>
            <span className="icon">
              <img src={home} alt="" />
            </span>
            <span className="pageName">Home</span>
          </a>
          <a
            href="#authform"
            onClick={(event) => handleClickTwo('AuthForm', event)}
          >
            <span className="icon">
              <img src={login} alt="" />
            </span>
            <span className="pageName">Signup/Login</span>
          </a>
        </nav>
      </header>
    );
  }
};

export default Header;
