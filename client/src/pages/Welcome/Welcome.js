import React from "react";

import "./Welcome.css";

import star3 from "../../assets/star3.png";
import star4 from "../../assets/star4.png";
import star5 from "../../assets/star5.png";
import star6 from "../../assets/star6.png";
import star7 from "../../assets/star7.png";
import star8 from "../../assets/star8.png";
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

        <div className="star blue">
          <img src={star3} alt="blue 4 pointed star" />
        </div>

      </div>


        <div className="star shooting">
          <img src={star4} alt="a shooting star" />
        </div>
        <div className="star shine">
          <img src={star5} alt="" />
        </div>
        <div className="star orange">
          <img src={star6} alt="" />
        </div>
        <div className="star yelloworange">
          <img src={star7} alt="" />
        </div>

      <div>
        <div className="discription">
          <h2>An app that helps you build healthy habits to improve your mental health and achieve your goals through positive reinforcement.</h2>
          <div className="star green">
            <img src={star8} alt="" />
          </div>
        </div>

        <div className="getStarted">
          <h2>Get started sighning up or logging in and creating a goal</h2>
        </div>
        
        {/* add link to create goal page */}
      </div>
    </main>
  )
};