const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
// const dateScalar = require('./scalar');

const resolvers = {
  // Date: dateScalar,
  Query: {
    me: async (_parent, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    addUser: async (_parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveGoal: async (_parent, { input }, context) => {
      console.log(args);
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGoals: input } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You must be logged in to save a book.');
    },
    removeGoal: async (_parent, { _id }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: { _id: _id } } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
