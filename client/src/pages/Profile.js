import React from "react";
import Header from "../components/header/Header";

const Profile = ({ goal, tasks, username, streak }) => {
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    // const allTaskschecked = updatedTasks.every((task) => task.checked);
    // setAllChecked(allTaskschecked);
  };

  return (
    <div className="page_wrapper">
      <Header />
      <div className="content-wrapper">
        <h2>Welcome {username}!</h2>
        <h3>You're {streak} days into building your habit goal!</h3>
        <h3>Current Goal: {goal}</h3>
        <div className="task-box">
          {tasks.map(({ name, index, checked }) => (
            <React.Fragment key={index}>
              <label>{name}</label>
              <input
                className="task-checkbox"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => handleCheckboxChange(index)}
              />
            </React.Fragment>
          ))}
        </div>
        {/* {allChecked && <>effect</>} */}
      </div>
    </div>
  );
};

export default Profile;