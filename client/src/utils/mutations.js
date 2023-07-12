import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_GOAL = gql`
  mutation saveGoal($input: SaveGoalInput!) {
    saveGoal(input: $input) {
      _id
      username
      goals {
        _id
        name
        tasks {
          _id
          name
          completed
        }
        startDate
        endDate
        streak
      }
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($_id: ID!) {
    removeGoal(_id: $_id) {
      _id
      username
      goals {
        _id
        name
        tasks {
          _id
          name
          completed
        }
        startDate
        streak
      }
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation completeTask($goalId: ID!, $taskId: ID!, $newValue: Boolean!) {
    completeTask(goalId: $goalId, taskId: $taskId, newValue: $newValue) {
      _id
      username
      goals {
        _id
        name
        tasks {
          _id
          name
          completed
        }
        startDate
        streak
      }
    }
  }
`;

export const UPDATE_STREAK = gql`
  mutation UpdateStreak($goalId: ID!) {
    updateStreak(goalId: $goalId) {
      _id
      goals {
        streak
        _id
        endDate
        name
        startDate
        tasks {
          _id
          completed
          name
        }
      }
    }
  }
`;

export const RESET_STREAK = gql`
  mutation resetStreak($goalId: ID!) {
    resetStreak(goalId: $goalId) {
      _id
      goals {
        streak
        _id
        endDate
        name
        startDate
        tasks {
          _id
          completed
          name
        }
      }
    }
  }
`;

export const DATES_COMPLETED = gql`
  mutation datesCompleted($goalId: ID!, $newValue: String) {
    datesCompleted(goalId: $goalId, newValue: $newValue) {
      _id
      goals {
        streak
        datesCompleted
        _id
        endDate
        name
        startDate
        tasks {
          _id
          completed
          name
        }
      }
    }
  }
`;
