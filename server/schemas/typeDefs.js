const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    goals: [Goal]
  }

  type Goal {
    _id: ID!
    tasks: [Task]!
    startDate: Date!
    endDate: Date
    streak: Int!
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean!
  }

  input SaveGoalInput {
    tasks: [Task]!
    startDate: Date!
    endDate: Date
    streak: Int!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGoal(input: SaveGoalInput!): User
    removeBook(_id: ID!): User
  }
`;

module.exports = typeDefs;
