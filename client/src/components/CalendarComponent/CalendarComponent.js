import React from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import dayjsLocalizer from "react-big-calendar/lib/localizers/dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarComponent.css";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  const events = myEventsList.map((goal) => {
    const startDateDayjs = dayjs.unix(goal.startDate).format('YYYY-MM-DD');
    // console.log(goal.startDate);
    // const startDate = new Date(goal.startDate);
    console.log(startDateDayjs);

    return {
      id: goal._id,
      title: goal.name,
      start: startDateDayjs || null,
      end: startDateDayjs ? new Date(startDateDayjs.getTime() + 7 * 24 * 60 * 60 * 1000) : null,
    };
  });

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