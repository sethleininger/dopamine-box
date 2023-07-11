import React from "react";

import "./Welcome.css";

// import star6 from "../../assets/star6.png";
import box2 from "../../assets/box2.svg";


export default function Welcome() {

  return (
    <main className="welcome-page">
      <div className="WP-welcome">
        <div className="welcometo">
          <span>W</span>
          <span>E</span>
          <span>L</span>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>E</span>
        </div>
        <div className="to">
          <span>T</span>
          <span>O</span>
        </div>  
        <div className="dopaminebox">
          <span>D</span>
          <span>O</span>
          <span>P</span>
          <span>A</span>
          <span>M</span>
          <span>I</span>
          <span>N</span>
          <span>E</span>
          <span>B</span>
          <span>O</span>
          <span>X</span>
        </div>

        <div className="box">
          <img src={box2} alt="" />
        </div>
      </div>
      <div>
        
        <h2>An app that helps you build healthy habits to improve your mental health and achieve your goals through positive reinforcement.</h2>

        <h2>Get started by setting a goal and daily habits that will help you reach that goal</h2>
        {/* add link to create goal page */}
      </div>
    </main>
  )
}