const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
  },
  startYear: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  endYear: {
    type: String,
  },
});

module.exports = educationSchema;
