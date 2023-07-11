import React, { useState } from "react";
// import Profile.css
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
function Profile(tasks) {
  // console.log("test");
  // console.log(GET_ME);
  // const [allChecked, setAllChecked] = useState(false);
  const { data } = useQuery(GET_ME);
  // console.log(data);
  const userData = data?.me || {};
  // console.log(userData);
  const goal = userData.goals;
  console.log(goal);
  // const handleCheckboxChange = (index) => {
  //   const updatedTasks = [...tasks];
  //   updatedTasks[index].checked = !updatedTasks[index].checked;
  //   const allTaskschecked = updatedTasks.every((task) => task.checked);
  //   setAllChecked(allTaskschecked);
  // };
  return (
    <div className="page_wrapper">
      <div className="content-wrapper">
        <h2>Welcome {userData.username}!</h2>
        <h3>
          You're {userData.goals.streak} days into building your habit goal!
        </h3>
        <h3>Current Goal: {userData.goals.name}</h3>
        <div className="task-box">
          {/* {userData.goals[0].tasks.map(({ name, index, checked }) => (
            <>
              <label>{name}</label>
              <input
                className="task-checkbox"
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => handleCheckboxChange(index)}
              ></input>
            </>
          ))} */}
        </div>
        {/* {allChecked && <>effect</>} */}
      </div>
    </div>
  );
}

export default Profile;
