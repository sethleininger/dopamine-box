import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
//importing calendar component
import MyCalendar from '../../components/CalendarComponent/CalendarComponent';
// import styling
import './Calendar.css';

import fire from '../../assets/fire.png';

export default function CalendarPage() {
  const [yourGoalList, setYourGoalList] = useState([]);
  const { loading, data } = useQuery(GET_ME);
  // console.log(data);
  const userData = data?.me || {};
  console.log(userData);
  // console.log(userData.goals[0].datesCompleted[0]);
  // const date = new Date(userData.goals[0].datesCompleted[0]);
  // console.log(date);

  // useEffect(() => {
  //   if (data) {
  //     setYourGoalList(data.me.goals);
  //   }
  // }, [data]);

  // const [currentArrayIndex, setCurrentArrayIndex] = useState(0);

  useEffect(() => {
    if (data) {
      setYourGoalList(
        data.me.goals.map((goal, index) => ({
          ...goal,
          color: getColorByIndex(index),
        }))
      );
    }
  }, [data]);

  const getColorByIndex = (index) => {
    // Define an array of colors
    const colors = ['#f7c6a3ff', '#bae3daff', '#a5dbf2ff', '#c6def1ff', '#d3c0f0ff'];
    // Return the color based on the index
    return colors[index % colors.length];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="calendar-page">
      {/* Key section */}
      <div className='key-streak-info'>
        <div className="key">
          <ul>
            <li>
              <h3>Key</h3>
            </li>
            <li>
              <FontAwesomeIcon icon={faBoxOpen} color="#BAE3DA" /> Streak
            </li>
            <li>
              <FontAwesomeIcon icon={faBoxOpen} color="#FAEDCB" /> Today
            </li>
            {/* <li>
              <FontAwesomeIcon icon={faBoxOpen} color="#FAA5AB" /> Incomplete
            </li>
            <li>
              <FontAwesomeIcon icon={faBoxOpen} color="#F7C6A3" /> Future
            </li> */}
          </ul>
        </div>

        {/* Streak section */}
        <div className="streak">
          <h2>{userData.username}'s STREAKS</h2>
          <div className="streak-container">
          {userData.goals.map((goal) => (
            <div className='goal-streak'>
              <h3>{goal.name}</h3>
              <div>
                <img src={fire} alt="" />
                <h3>{goal.streak}</h3>
              </div>
            </div>
          ))}
          </div>
        </div>        
      </div>


      {/* Calendar section */}
      <div className='calendar-section'>
        <div className='calendar-title'> 
          <h2>{userData.username}'s Calendar</h2>
        </div>
        <MyCalendar myEventsList={yourGoalList} />
      </div>
    </main>
  );
}
