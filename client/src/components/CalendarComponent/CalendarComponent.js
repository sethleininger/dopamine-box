import React from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import dayjsLocalizer from "react-big-calendar/lib/localizers/dayjs";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;