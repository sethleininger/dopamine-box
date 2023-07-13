import React, { useEffect, useState } from "react";
import "./Profile.css";
import Modal from "react-modal";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import {
  COMPLETE_TASK,
  UPDATE_STREAK,
  RESET_STREAK,
  DATES_COMPLETED,
  REMOVE_GOAL,
} from "../../utils/mutations";

import useSound from "use-sound";
import clickOne from "../../assets/sounds/gannonSound2.mp3";
import modalStyles from "./modal";
import starhappy from "../../assets/starhappy.png";
import fire from "../../assets/fire.png";
import trophy from "../../assets/trophy.png";
import done from "../../assets/done.png";
import bolts from "../../assets/bolts.png";
import wow from "../../assets/wow.png";
import createGoal from "../../assets/createGoal.png";
import heart from "../../assets/heart.png";
import star2 from "../../assets/star2.png";

function Profile({ currentPage, handlePageChange }) {
  const [allChecked, setAllChecked] = useState(false);
  const [isPastMidnight, setIsPastMignight] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [completeTask, { error }] = useMutation(COMPLETE_TASK);
  const [updateStreak] = useMutation(UPDATE_STREAK);
  const [resetStreak] = useMutation(RESET_STREAK);
  const [datesCompleted] = useMutation(DATES_COMPLETED);
  const [removeGoal] = useMutation(REMOVE_GOAL);

  const [play] = useSound(clickOne); // Initialize the useSound hook

  const [modalSaying, setModalSaying] = useState("");
  const [modalImage, setModalImage] = useState("");

  const modalSayings = [
    "Congratulations on completing a task!",
    "Great job! Keep up the good work!",
    "You're making progress! Keep it up!",
    "Well done! One step closer to your goal!",
    "WOW!!! Look at you go!",
    "Well done! One step closer to your goal!",
    "You're doing amazing! Keep going!",
    "You're crushing it! Don't stop now!",
    "Every small step counts! You're doing great!",
    "You're a superstar! Keep shining!",
    "Believe in yourself! You've got this!",
    "You're on fire! Keep up the momentum!",
    "You're unstoppable! Keep pushing forward!",
  ];
  
  const modalImages = [
    trophy,
    starhappy,
    done,
    bolts,
    wow,
    createGoal,
    heart,
    star2
  ]

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

  const openDeleteAlert = () => {
    setShowDeleteAlert(true);
  };

  const closeDeleteAlert = () => {
    setShowDeleteAlert(false);
  };

  const deleteGoal = async () => {
    try {
      const goalId = userData.goals[currentArrayIndex]._id;
      console.log(goalId);
      setCurrentArrayIndex(0);
      await removeGoal({
        variables: { _id: goalId },
      });

      closeDeleteAlert();
    } catch (e) {
      console.error(e);
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
        throw new Error("something went wrong!");
      }

      play(); // Play the sound when the checkbox is clicked

      const randomIndex = Math.floor(Math.random() * modalSayings.length);
      setModalSaying(modalSayings[randomIndex]);
      setModalImage(modalImages[randomIndex]);
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
    <>
      <div className="page_wrapper">
        <div className="content-wrapper">
          <h2>
            <span>
              <img src={starhappy} alt="" />
            </span>
            Welcome {userData.username}!
          </h2>
          {!userData.goals.length ? (
            <>
              <h2>Get started building your habit goals!</h2>
              <button
                onClick={(event) => handlePageChange("CreateGoal", event)}
              >
                Start
              </button>
            </>
          ) : (
            <>
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
                <div className="button-group">
                  <button onClick={decreaseIndex}>Prev</button>
                  <button onClick={resetTasks}>Reset</button>
                  <button onClick={increaseIndex}>Next</button>
                </div>
                <button onClick={openDeleteAlert}>Delete Goal</button>

                {/* Delete Confirmation Modal */}
                <Modal
                  isOpen={showDeleteAlert}
                  onRequestClose={closeDeleteAlert}
                  style={modalStyles}
                  contentLabel="Delete Confirmation"
                >
                  <h2>Are you Sure?</h2>
                  <p>Deleting a goal will lose your streak data!</p>
                  <div style={modalStyles.buttonContainer}>
                    <button style={modalStyles.button} onClick={deleteGoal}>
                      Delete
                    </button>
                    <button
                      style={modalStyles.button}
                      onClick={closeDeleteAlert}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
              <Modal
                isOpen={modalSaying !== ""}
                onRequestClose={() => {
                  setModalSaying("")
                  setModalImage("")
                }}
                contentLabel="Modal"
                style={modalStyles}

              >
                <img className='modal-img' src={modalImage}/>
                <p>{modalSaying}</p>
                <button onClick={() => {
                  setModalSaying("")
                  setModalImage("")
                }}>Close</button>
              </Modal>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
