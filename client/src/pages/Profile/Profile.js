import React, { useEffect, useState } from 'react';
import './Profile.css';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import {
  COMPLETE_TASK,
  UPDATE_STREAK,
  RESET_STREAK,
  DATES_COMPLETED,
} from '../../utils/mutations';

import useSound from 'use-sound';
import clickOne from '../../assets/sounds/gannonSound2.mp3';

import starhappy from '../../assets/starhappy.png';
import fire from '../../assets/fire.png';

function Profile() {
  const [allChecked, setAllChecked] = useState(false);
  const [isPastMidnight, setIsPastMignight] = useState(false);

  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [completeTask, { error }] = useMutation(COMPLETE_TASK);
  const [updateStreak] = useMutation(UPDATE_STREAK);
  const [resetStreak] = useMutation(RESET_STREAK);
  const [datesCompleted] = useMutation(DATES_COMPLETED);

  const [play] = useSound(clickOne); // Initialize the useSound hook

  const [currentArrayIndex, setCurrentArrayIndex] = useState(0);
  const decreaseIndex = () => {
    if (currentArrayIndex === 0) {
      setCurrentArrayIndex(userData.goals.length - 1);
    } else if (currentArrayIndex > 0) {
      setCurrentArrayIndex(currentArrayIndex - 1);
      console.log(currentArrayIndex);
    }
  };
  const increaseIndex = () => {
    if (currentArrayIndex === userData.goals.length - 1) {
      setCurrentArrayIndex(0);
    } else if (currentArrayIndex < userData.goals.length - 1) {
      setCurrentArrayIndex(currentArrayIndex + 1);
      console.log(currentArrayIndex);
    }
  };

  const resetTasks = async () => {
    try {
      const goalId = userData.goals[currentArrayIndex]._id;

      userData.goals[currentArrayIndex].tasks.forEach(async (task) => {
        await completeTask({
          variables: {
            goalId: goalId,
            taskId: task._id,
            newValue: false,
          },
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckboxChange = async (goalId, taskId, newValue) => {
    try {
      const { data } = await completeTask({
        variables: { goalId: goalId, taskId: taskId, newValue: !newValue },
      });

      const tasks = data.completeTask.goals[currentArrayIndex].tasks;
      const allTasksChecked = tasks.every((task) => task.completed);
      setAllChecked(allTasksChecked);
      if (allTasksChecked) {
        const { data: updateStreakData } = await updateStreak({
          variables: { goalId: goalId },
        });

        const date = new Date();

        const { data: datesCompletedData } = await datesCompleted({
          variables: { goalId: goalId, newValue: date },
        });
        console.log(datesCompletedData);
      }
      if (error) {
        throw new Error('something went wrong!');
      }

      play(); // Play the sound when the checkbox is clicked
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const checkPastMidnight = async () => {
      const now = new Date();
      // console.log(now);

      const pastMidnight =
        now.getHours() === 20 &&
        now.getMinutes() === 59 &&
        now.getSeconds() === 10;

      // setIsPastMignight(pastMidnight);
      if (!allChecked && pastMidnight) {
        const { data } = await resetStreak({
          variables: { goalId: userData.goals[currentArrayIndex]._id },
        });
      }

      if (pastMidnight) {
        const completedTasks = userData.goals[currentArrayIndex].tasks.filter(
          (task) => task.completed === true
        );
        console.log(completedTasks);

        completedTasks.forEach((task) => {
          handleCheckboxChange(
            userData.goals[currentArrayIndex]._id,
            task._id,
            true
          );
        });
      }
    };

    const interval = setInterval(checkPastMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="page_wrapper">
      <div className="content-wrapper">
        <h2>
          <span>
            <img src={starhappy} alt="" />
          </span>
          Welcome {userData.username}!
        </h2>
        <h3 className="streak">
          You're
          <span>
            <img src={fire} alt="" />
          </span>
          {userData.goals[currentArrayIndex].streak}
          <span>
            <img src={fire} alt="" />
          </span>
          days into building your habit goal!
        </h3>
        <h3 className="current-goal">
          Current Goal: {userData.goals[currentArrayIndex].name}
        </h3>
        <div className="task-box">
          {userData.goals[currentArrayIndex].tasks.map(
            ({ name, index, completed, _id }) => (
              <div className="task" key={_id}>
                <label>{name}</label>
                <input
                  className="task-checkbox"
                  type="checkbox"
                  name={name}
                  checked={completed}
                  onChange={() =>
                    handleCheckboxChange(
                      userData.goals[currentArrayIndex]._id,
                      _id,
                      completed
                    )
                  }
                  disabled={completed}
                />
              </div>
            )
          )}
          <button onClick={decreaseIndex}>Prev</button>
          <button onClick={resetTasks}>Reset</button>
          <button onClick={increaseIndex}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
