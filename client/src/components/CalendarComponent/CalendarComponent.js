import React from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import dayjsLocalizer from "react-big-calendar/lib/localizers/dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  // Sample event object with start and end dates
  const events = [
    {
      id: 1,
      title: "Sample Event",
      start: new Date(2023, 6, 12, 10, 0), // Set the start date and time
      end: new Date(2023, 6, 12, 12, 0), // Set the end date and time
    },
  ];

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