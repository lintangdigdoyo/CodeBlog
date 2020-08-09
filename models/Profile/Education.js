const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  start: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  end: {
    type: Date,
  },
});

module.exports = educationSchema;
