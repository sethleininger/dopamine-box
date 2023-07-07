import React from "react";

//importing calendar component
import MyCalendar from "../components/CalendarComponent/CalendarComponent";

// import styling 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxopen } from '@fortawesome/free-solid-svg-icons';

export default function CalendarPage() {

  return (
    <main className="calender-page">
      <div className="key">
        <ul>
          <li><FontAwesomeIcon icon={faBoxopen} color="#BAE3DA"/> completed</li>
          <li><FontAwesomeIcon icon={faBoxopen} color="#FAEDCB"/> today</li>
          <li><FontAwesomeIcon icon={faBoxopen} color="#FAA5AB"/> incomplete</li>
          <li><FontAwesomeIcon icon={faBoxopen} color="#F7C6A3"/> future</li>
        </ul>
      </div>
      <div className="streak">
        {/* streak info here */}
      </div>
      <div>
        <MyCalendar />
      </div>
    </main>
  )
}