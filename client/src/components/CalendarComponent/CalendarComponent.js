import React from "react";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
const localizer = dayjsLocalizer(dayjs);

const MyCalendar = (myEventsList, props) => (
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

export default MyCalendar;
