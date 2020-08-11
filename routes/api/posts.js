const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');

const Post = require('../../models/Post/Post');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

//@route POST api/posts
//@desc Create a new post
//@access Private

router.post(
  '/',
  auth,
  [
    check('title', 'Please enter a title').not().isEmpty(),
    check('thumbnail', 'Please enter a thumbnail').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, header, thumbnail, text } = req.body;

    try {
      const post = new Post({
        user: req.user.id,
        title,
        header,
        thumbnail,
        text,
      });

      await post.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route GET api/posts/:postId
//@desc Get a post
//@access Public

router.get('/:postId', checkObjectId('postId'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/posts
//@desc Get all posts
//@access Public

router.get('/', async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PATCH api/posts/:postId
//@desc update a post
//@access Private

router.patch(
  '/:postId',
  auth,
  checkObjectId('postId'),
  [
    check('title', 'Please enter a title').not().isEmpty(),
    check('thumbnail', 'Please enter a thumbnail').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, header, thumbnail, text } = req.body;

    try {
      let post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(401).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(400).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      if (title) post.title = title;
      if (header) post.header = header;
      if (thumbnail) post.thumbnail = thumbnail;
      if (text) post.text = text;

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/posts/:postId
//@desc delete a post
//@access Private

router.delete('/:postId', auth, checkObjectId('postId'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
    }

    await post.remove();
    res.json({ msg: 'Post Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
