import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
//importing calendar component
import MyCalendar from '../../components/CalendarComponent/CalendarComponent';
// import styling
import './Calendar.css';

export default function CalendarPage() {
  const [yourGoalList, setYourGoalList] = useState([]);
  const { loading, data } = useQuery(GET_ME);
  // console.log(data);
  const userData = data?.me || {};
  // console.log(userData);
  // console.log(userData.goals[0].datesCompleted[0]);
  // const date = new Date(userData.goals[0].datesCompleted[0]);
  // console.log(date);

  // useEffect(() => {
  //   if (data) {
  //     setYourGoalList(data.me.goals);
  //   }
  // }, [data]);

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
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF'];
    // Return the color based on the index
    return colors[index % colors.length];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className="streak">
        <h2>{userData.username}'s STREAKS</h2>
        {}
      </div>

      {/* Calendar section */}
      <div>
        <MyCalendar myEventsList={yourGoalList} />
      </div>
    </main>
  );
}
