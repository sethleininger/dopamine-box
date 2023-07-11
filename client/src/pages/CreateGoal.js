import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_GOAL } from "../utils/mutations";

const SaveGoalForm = () => {
  const [ addGoal ] = useMutation(SAVE_GOAL);

  const [goalFormData, setGoalFormData] = useState({
    name: "",
    task: ["", "", "", "", ""],
  });
  console.log(goalFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if ( name === 'name') {
        setGoalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    } else {
      const updatedTasks = [...goalFormData.task];
      const taskIndex = Number(name.replace('Task', '')) - 1;
      updatedTasks[taskIndex] = value;

      setGoalFormData((prevState) => ({
        ...prevState,
        task: updatedTasks,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // alert(`You have added ${goalFormData.name} as a goal`);

    // const form = event.currrentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      const { data } = await addGoal({ variables: { ...goalFormData } });
      console.log(data, "line");
    } catch (err) {
      console.error(err);
    }
    

    setGoalFormData({
      name: "",
      task: ["", "", "", "", ""],
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="goalName">Goal Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of Goal"
            name="name"
            onChange={handleInputChange}
            value={goalFormData.name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task1">Task 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name='Task1'
            onChange={handleInputChange}
            value={goalFormData.task[0]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task2">Task 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task2"
            onChange={handleInputChange}
            value={goalFormData.task[1]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task3">Task 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task3"
            onChange={handleInputChange}
            value={goalFormData.task[2]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task4">Task 4</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task4"
            onChange={handleInputChange}
            value={goalFormData.task[3]}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task5">Task 5</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task5"
            onChange={handleInputChange}
            value={goalFormData.task[4]}
          />
        </Form.Group>

        <Button
          disabled={
            !goalFormData.name ||
            !goalFormData.task.slice(0, 3).every((task) => task !== "")
          }
          type="submit"
          variant="success"
        >
          Add Goal
        </Button>
      </Form>
    </>
  );
};

export default SaveGoalForm;