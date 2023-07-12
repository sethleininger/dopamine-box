import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN_USER } from "../../utils/mutations";

import useSound from "use-sound";
import signinClick from "../../assets/sounds/signinClick.mp3";

import Auth from "../../utils/auth";

import "./AuthForm.css";

const AuthForm = () => {
  const [addUser, { error: signupError }] = useMutation(ADD_USER);
  const [login, { error: loginError }] = useMutation(LOGIN_USER);

  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    try {
      if (isSignup) {
        const { data } = await addUser({ variables: { ...userFormData } });
        Auth.login(data.addUser.token);
      } else {
        const { data } = await login({ variables: { ...userFormData } });
        Auth.login(data.login.token);
      }
      // play();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const [play] = useSound(signinClick);

  useEffect(() => {
    if (!isSignup) {
      play();
    }
  }, [isSignup, play]);

  return (
    <div className="login">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          {isSignup
            ? "Something went wrong with your signup!"
            : "Something went wrong with your login credentials!"}
        </Alert>
        
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        
        {isSignup && (
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              Username is required!
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(userFormData.email && userFormData.password) ||
            (isSignup && !userFormData.username)
          }
          type="submit"
          variant="success"
        >
          {isSignup ? "Sign Up" : "Log In"}
        </Button>
      </Form>

      <div className="text-center mt-2">
        <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Log in here."
            : "Don't have an account? Sign up here."}
        </Button>
      </div>
      <div className="some-flair">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default AuthForm;
