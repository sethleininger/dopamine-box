import React from "react";
//importing calendar component
import MyCalendar from "../../components/CalendarComponent/CalendarComponent";
// import styling 
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function CalendarPage() {
  // Your array of goal objects
  const yourGoalList = [
    // Example goal object:
    {
      _id: "goalId",
      name: "Sample Goal",
      startDate: "2023-07-13", // Replace with actual start date
    }

    // Add more goal objects here as needed
  ];

  return (
    <main className="calender-page">
      {/* Key section */}
      <div className="key">
        <ul>
          <li>
            <FontAwesomeIcon icon={faBoxOpen} color="#BAE3DA" /> Completed
          </li>
          <li>
            <FontAwesomeIcon icon={faBoxOpen} color="#FAEDCB" /> Today
          </li>
          <li>
            <FontAwesomeIcon icon={faBoxOpen} color="#FAA5AB" /> Incomplete
          </li>
          <li>
            <FontAwesomeIcon icon={faBoxOpen} color="#F7C6A3" /> Future
          </li>
        </ul>
      </div>

      {/* Streak section */}
      <div className="streak">{/* streak info here */}</div>

      {/* Calendar section */}
      <div>
        <MyCalendar myEventsList={yourGoalList} />
      </div>
    </main>
  );
};