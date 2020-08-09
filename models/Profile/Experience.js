const mongoose = require('mongoose');

const experienceSchama = new mongoose.Schema({
  job: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  end: {
    type: String,
  },
});

module.exports = experienceSchama;
