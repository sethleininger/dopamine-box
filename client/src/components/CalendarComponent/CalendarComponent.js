import React from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import dayjsExt from "dayjs-ext";

dayjs.extend(localizedFormat);
dayjs.extend(dayjsExt);

const localizer = Calendar.momentLocalizer(dayjs);

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
