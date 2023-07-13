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
    type: String,
    default: Date.now,
  },
  endDate: {
    type: String,
  },
  streak: {
    type: Number,
    default: 0,
  },
  datesCompleted: [String],
});

module.exports = goalSchema;
