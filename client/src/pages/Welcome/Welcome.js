import React from "react";

import "./Welcome.css";

import star6 from "../../assets/star6.png";
import box2 from "../../assets/box2.svg";


export default function Welcome() {

  return (
    <main className="welcome-page">
      <div className="WP-welcome">
        <span> <img className='star6' src={star6} alt="orange star" /> </span>
        <h1>Welcome to <span className="WP-logo">Dopamine Box</span></h1>
      </div>
      <div className="box">
        <img src={box2} alt="" />
      </div>
      <div>
        
        <h2>An app that helps you build healthy habits to improve your mental health and achieve your goals through positive reinforcement.</h2>

        <h2>Get started by setting a goal and daily habits that will help you reach that goal</h2>
        {/* add link to create goal page */}
      </div>
    </main>
  )
}