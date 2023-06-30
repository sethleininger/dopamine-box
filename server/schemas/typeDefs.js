const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    goals: [Goal]
  }

  type Goal {
    _id: ID!
    tasks: [Task]
    startDate: Date!
    endDate: Date
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
    startDate: Date!
    endDate: Date
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGoal(input: SaveGoalInput!): User
    removeGoal(_id: ID!): User
  }
`;

module.exports = typeDefs;
