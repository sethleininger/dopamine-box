const { Schema } = require('mongoose');

// import schema from Task.js
const taskSchema = require('./Task');

const goalSchema = new Schema({
  tasks: [taskSchema],
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  streak: {
    type: Number,
  },
});

module.exports = goalSchema;
