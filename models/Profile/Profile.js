const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
});
