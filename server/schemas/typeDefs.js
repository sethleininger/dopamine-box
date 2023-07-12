const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    goals: [Goal]
  }

  type Goal {
    _id: ID!
    name: String!
    tasks: [Task]
    startDate: String
    endDate: String
    streak: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
  }

  input TaskInput {
    _id: ID!
    name: String!
    completed: Boolean!
  }

  input SaveGoalInput {
    _id: ID!
    tasks: [TaskInput]!
    startDate: String
    endDate: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGoal(input: SaveGoalInput!): User
    removeGoal(_id: ID!): User
    completeTask(goalId: ID!, taskId: ID!, newValue: Boolean!): User
    updateStreak(goalId: ID!): User
    # completedGoal(userId: ID!, _id: ID!): User
  }
`;

module.exports = typeDefs;
