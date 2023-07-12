const { Schema } = require('mongoose');

// import schema from Task.js
const taskSchema = require('./Task');

const goalSchema = new Schema({
  tasks: [taskSchema],
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  streak: {
    type: Number,
    default: 0,
  },
  datesCompleted: [Date],
});

module.exports = goalSchema;
