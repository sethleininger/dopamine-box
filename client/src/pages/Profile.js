import React, { useState } from 'react';
// import Profile.css
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { COMPLETE_TASK } from '../utils/mutations';
function Profile() {
  // const [allChecked, setAllChecked] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  // console.log(userData);

  const [completeTask, { error }] = useMutation(COMPLETE_TASK);

  const handleCheckboxChange = async (goalId, taskId, newValue) => {
    // console.log(goalId);
    // console.log(taskId);
    // console.log(newValue);

    try {
      const { data } = await completeTask({
        variables: { goalId: goalId, taskId: taskId, newValue: newValue },
      });

      // console.log(data);

      if (error) {
        throw new Error('something went wrong!');
      }
    } catch (e) {
      console.error(e);
    }
    // const updatedTasks = [...tasks];
    // updatedTasks[index].checked = !updatedTasks[index].checked;
    // const allTaskschecked = updatedTasks.every((task) => task.checked);
    // setAllChecked(allTaskschecked);
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
                  handleCheckboxChange(userData.goals[0]._id, _id, !completed)
                }
              ></input>
            </>
          ))}
        </div>
        {/* {allChecked && <>effect</>} */}
      </div>
    </div>
  );
}

export default Profile;
