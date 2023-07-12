import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { SAVE_GOAL } from '../utils/mutations';

const SaveGoalForm = () => {
  const [saveGoal] = useMutation(SAVE_GOAL);

  const [goalFormData, setGoalFormData] = useState({
    name: '',
    tasks: [
      { name: '' },
      { name: '' },
      { name: '' },
      { name: '' },
      { name: '' },
    ],
  });
  console.log(goalFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setGoalFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const updatedTasks = [...goalFormData.tasks];
      const taskIndex = Number(name.replace('Task', '')) - 1;
      updatedTasks[taskIndex] = { name: value };

      setGoalFormData((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('test');
      console.log(goalFormData);
      const { data } = await saveGoal({ variables: { input: goalFormData } });
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }

    setGoalFormData({
      name: '',
      tasks: [
        { name: '' },
        { name: '' },
        { name: '' },
        { name: '' },
        { name: '' },
      ],
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
            name="Task1"
            onChange={handleInputChange}
            value={goalFormData.tasks[0].name}
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
            value={goalFormData.tasks[1].name}
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
            value={goalFormData.tasks[2].name}
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
            value={goalFormData.tasks[3].name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Task5">Task 5</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Task"
            name="Task5"
            onChange={handleInputChange}
            value={goalFormData.tasks[4].name}
          />
        </Form.Group>

        <Button
          disabled={
            !goalFormData.name ||
            !goalFormData.tasks.slice(0, 3).every((task) => task !== '')
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
