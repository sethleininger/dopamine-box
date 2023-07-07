import React, { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_GOAL } from "../utils/mutations";

const SaveGoalForm = () => {
  const [addGoal, { error }] = useMutation(SAVE_GOAL);

  const [goalFormData, setGoalFormData] = useState({
    task: ["", "", "", "", ""],
    name: "",
  });

  const handleInputChange = (event) => {
    setGoalFormData({ ...goalFormData });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // alert(`You have added ${goalFormData.name} as a goal`);

    const form = event.currrentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addGoal({ variables: { ...goalFormData } });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    setGoalFormData({
      task: ["", "", "", "", ""],
      name: "",
    });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Goal Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of Goal"
            name="Goal Name"
            onChange={handleInputChange}
            value={goalFormData}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task">Task 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task"
            onChange={handleInputChange}
            value={goalFormData.task[0]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task">Task 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task"
            onChange={handleInputChange}
            value={goalFormData.task[1]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task">Task 3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task"
            onChange={handleInputChange}
            value={goalFormData.task[2]}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task">Task 4</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task"
            onChange={handleInputChange}
            value={goalFormData.task[3]}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task">Task 5</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task"
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
