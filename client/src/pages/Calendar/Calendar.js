import React from "react";

//importing calendar component
import MyCalendar from "../../components/CalendarComponent/CalendarComponent";

// import styling 
import './Calendar.css'; // Import Calendar.css file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

export default function CalendarPage() {
  return (
    <main className="calender-page">
      <div className="key">
        <ul>
          <li><FontAwesomeIcon icon={faBoxOpen} color="#BAE3DA"/> Completed</li>
          <li><FontAwesomeIcon icon={faBoxOpen} color="#FAEDCB"/> Today</li>
          <li><FontAwesomeIcon icon={faBoxOpen} color="#FAA5AB"/> Incomplete</li>
          <li><FontAwesomeIcon icon={faBoxOpen} color="#F7C6A3"/> Future</li>
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
};