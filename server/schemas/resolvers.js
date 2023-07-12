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
<<<<<<< Updated upstream
      console.log(input);

=======
      // console.log(input);
>>>>>>> Stashed changes
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: input } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You must be logged in to save a book.');
    },
    removeGoal: async (_parent, { _id }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: { _id } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You must be logged in to remove a goal.');
    },
    completeTask: async (_parent, { goalId, taskId, newValue }, context) => {
      if (context.user) {
        try {
          return User.findOneAndUpdate(
            {
              _id: context.user._id,
              'goals._id': goalId,
              'goals.tasks._id': taskId,
            },
            { $set: { 'goals.$[goal].tasks.$[task].completed': newValue } },
            {
              new: true,
              arrayFilters: [{ 'goal._id': goalId }, { 'task._id': taskId }],
            }
          );
        } catch (error) {
          console.error(error);
          throw new Error('An error occurred while updating the task completion status.');
        }
      }
      throw new AuthenticationError('You must be logged in to update task completion.');
    },
    updateStreak: async (_parent, { goalId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          {
            _id: context.user._id,
            'goals._id': goalId,
          },
          { $inc: { 'goals.$[goal].streak': 1 } },
          {
            new: true,
            arrayFilters: [{ 'goal._id': goalId }],
          }
        );
      }
    },
    // added by zach for completed goals
    // completedGoal: async (_parent, { userId, _id }, context) => {
    //   // if (context.user) {
    //   const user = await User.findById(userId);
    //   const goal = user.goals.id(_id);
    //   if (!goal) {
    //     throw new Error('Goal not found');
    //   }
    //   const allTasksCompleted = goal.tasks.every((task) => task.completed);
    //   if (allTasksCompleted) {
    //     goal.streak++;
    //     await user.save();
    //   }
    //   return goal;
    //   // }
    // },
  },
};

module.exports = resolvers;
