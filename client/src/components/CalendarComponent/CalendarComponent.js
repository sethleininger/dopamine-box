import React from 'react';
import { Calendar } from 'react-big-calendar';
import dayjs from 'dayjs';
import dayjsLocalizer from 'react-big-calendar/lib/localizers/dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/sass/styles';
import './CalendarComponent.css';

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ myEventsList, ...props }) => {
  // this will only show the goal with the longest streak
  const events = myEventsList.map((goal) => {
    if (goal.streak === 0) {
      return;
    }
    
    const start = dayjs().subtract((goal.streak -1), 'day').startOf('day').toDate();
    const end = dayjs().endOf('day').toDate();
  
    return {
      id: goal._id,
      title: goal.name,
      start: start,
      end: end
    };
  });
  
  // this will show all the individual dates that all the tasks in a goal were completed
  // const events = myEventsList.flatMap((goal) => {
  //   return goal.datesCompleted.map((date) => {
  //     const start = dayjs(date).startOf('day').toDate();
  //     const end = dayjs(date).endOf('day').toDate();
  //     console.log(start, end);

  //     return {
  //       id: goal._id,
  //       title: goal.name,
  //       start: start,
  //       end: end,
  //       className: 'goal-${goal._id}' 
  //     };
  //   });
  // });

  console.log(events);
  
  return (
    <div className="calendar-comp">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // eventPropGetter={(event) => ({
        //   className: `goal-${event.id}`,
        //   style : {
        //     backgroundColor: event.color,
        //   }
        // })}
      />
    </div>
  );
};

export default MyCalendar;
