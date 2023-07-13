import React from 'react';
import { Calendar } from 'react-big-calendar';
import dayjs from 'dayjs';
import dayjsLocalizer from 'react-big-calendar/lib/localizers/dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/sass/styles';
import './CalendarComponent.css';

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  const events = myEventsList.map((goal) => {
    const start = dayjs().subtract(goal.streak, 'day').startOf('day').toDate();
    const end = dayjs().endOf('day').toDate();
  
    return {
      id: goal._id,
      title: goal.name,
      start: start,
      end: end
    };
  });
  

  console.log(events);
  
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
