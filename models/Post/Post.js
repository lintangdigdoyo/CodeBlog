const mongoose = require('mongoose');
const Comment = require('./Comment');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  header: {
    type: String,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  like: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  dislike: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  viewer: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comment: [Comment],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('Post', postSchema);
