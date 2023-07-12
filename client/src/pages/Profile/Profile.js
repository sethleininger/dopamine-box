import React from 'react';
import './Profile.css'; // Import Profile.css file
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { COMPLETE_TASK, UPDATE_STREAK } from '../../utils/mutations';

function Profile() {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const [completeTask, { error }] = useMutation(COMPLETE_TASK);
  const [updateStreak] = useMutation(UPDATE_STREAK);

  const handleCheckboxChange = async (goalId, taskId, newValue) => {
    try {
      const { data } = await completeTask({
        variables: { goalId: goalId, taskId: taskId, newValue: !newValue },
      });

      const tasks = await data.completeTask.goals[0].tasks;
      const allTasksChecked = tasks.every((task) => task.completed);
      if (allTasksChecked) {
        const { data } = await updateStreak({
          variables: { goalId: goalId },
        });
      }

      if (error) {
        throw new Error('something went wrong!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="page_wrapper">
      <div className="content-wrapper">
        <h2>Welcome {userData.username}!</h2>
        <h3>
          You're {userData.goals[0].streak} days into building your habit goal!
        </h3>
        <h3>Current Goal: {userData.goals[0].name}</h3>
        <div className="task-box">
          {userData.goals[0].tasks.map(({ name, index, completed, _id }) => (
            <>
              <label>{name}</label>
              <input
                className="task-checkbox"
                type="checkbox"
                name={name}
                checked={completed}
                onChange={() =>
                  handleCheckboxChange(userData.goals[0]._id, _id, completed)
                }
              ></input>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
