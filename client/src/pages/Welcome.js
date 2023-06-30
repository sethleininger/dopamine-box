import React from "react";

//import styling 

export default function Welcome() {

  return (
    <main className="welcome-page">
      <div>
        <h1>Welcome to <span className="WP-logo">Dopamine Box</span></h1>
      </div>
      <div>
        <h2>An app that helps you build healthy habits to improve your mental health and achieve your goals through positive reinforcement.</h2>

        <h2>Get started by setting a goal and daily habits that will help you reach that goal</h2>
        {/* add link to create goal page */}
      </div>
    </main>
  )
}