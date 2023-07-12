import React from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import dayjsLocalizer from "react-big-calendar/lib/localizers/dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  // Convert the goal objects into event objects with start and end dates
  const events = myEventsList.map((goal) => ({
    id: goal._id, // Assuming each goal has a unique ID
    title: goal.name,
    start: new Date(goal.startDate), // Use the start date from the goal object
    end: new Date(dayjs(goal.startDate).add(7, 'day')), // Set the end date as 7 days from the start date
  }));

  return (
    <div className="calendar-comp">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};


export default MyCalendar;