const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const upload = require('../../middleware/upload');

const Post = require('../../models/Post/Post');

//@route POST api/posts
//@desc Create a new post
//@access Private

router.post(
  '/',
  auth,
  upload.fields([
    {
      name: 'header',
      maxCount: 1,
    },
    {
      name: 'thumbnail',
      maxCount: 1,
    },
  ]),
  [
    check('title', 'Please enter a title').not().isEmpty(),
    check('text', 'Text is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { header, thumbnail } = req.files;

    if (!thumbnail) {
      errors.errors.push({ msg: 'Please enter thumbnail', param: 'thumbnail' });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, text } = req.body;

    try {
      const post = new Post({
        user: req.user.id,
        thumbnail: thumbnail[0].path,
        header: header[0].path,
        title,
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

//@route GET api/posts/profiles/:userId
//@desc Get posts from user
//@access Public

router.get('/profiles/:userId', checkObjectId('userId'), async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId });
    if (!posts) {
      res.status(404).json({ errors: [{ msg: 'User post not found' }] });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

//@route POST api/posts/:postId/comments
//@desc Add a new comment
//@access Private

router.post(
  '/:postId/comments',
  auth,
  checkObjectId('postId'),
  check('text', 'Text is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      post.comment.push({ text });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route PATCH api/posts/:postId/comments/:commentId
//@desc Edit a comment
//@access Private

router.patch(
  '/:postId/comments/:commentId',
  auth,
  checkObjectId('postId'),
  checkObjectId('commentId'),
  check('text', 'Text is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(401).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      let updatePost = post.comment.filter(
        (comment) => comment.id === req.params.commentId
      );

      if (updatePost.length === 0) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      updatePost[0].text = text;

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/posts/:postId/comments/:commentId
//@desc Delete a comment
//@access Private

router.delete(
  '/:postId/comments/:commentId',
  auth,
  checkObjectId('postId'),
  checkObjectId('commentId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized user' }] });
      }

      const deleteIndex = post.comment
        .map((comment) => comment.id)
        .indexOf(req.params.commentId);

      if (deleteIndex < 0) {
        return res.status(404).json({ errors: [{ msg: 'Comment not found' }] });
      }

      post.comment.splice(deleteIndex, 1);

      await post.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/posts/:postId/like
//@desc Add like
//@access Private

router.post(
  '/:postId/like',
  auth,
  checkObjectId('postId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.like.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Post already liked' }] });
      }

      if (post.dislike.length > 0) {
        const deleteIndex = post.dislike
          .map((dislike) => dislike.user.toString())
          .indexOf(req.user.id);
        post.dislike.splice(deleteIndex, 1);
      }

      post.like.push({ user: req.user.id });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/posts/:postId/like
//@desc unlike post
//@access Private

router.delete(
  '/:postId/like',
  auth,
  checkObjectId('postId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.like.length === 0) {
        return res.status(400).json({ errors: [{ msg: 'There is no like' }] });
      }

      const deleteIndex = post.like
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.like.splice(deleteIndex, 1);

      await post.save();
      res.send(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route POST api/posts/:postId/dislike
//@desc Add dislike
//@access Private

router.post(
  '/:postId/dislike',
  auth,
  checkObjectId('postId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.dislike.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Post already disliked' }] });
      }

      if (post.like.length > 0) {
        const deleteIndex = post.like
          .map((like) => like.user.toString())
          .indexOf(req.user.id);
        post.like.splice(deleteIndex, 1);
      }

      post.dislike.push({ user: req.user.id });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route DELETE api/posts/:postId/dislike
//@desc  Undislike post
//@access Private

router.delete(
  '/:postId/dislike',
  auth,
  checkObjectId('postId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.dislike.length === 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'There is no dislike' }] });
      }

      const deleteIndex = post.dislike
        .map((dislike) => dislike.user.toString())
        .indexOf(req.user.id);

      post.dislike.splice(deleteIndex, 1);

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route ADD api/posts/:postId/view
//@desc  add viewer
//@access Private

router.post(
  '/:postId/view',
  auth,
  checkObjectId('postId'),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ errors: [{ msg: 'Post not found' }] });
      }

      if (post.viewer.length === 0) {
        post.viewer.push({ user: req.user.id });

        await post.save();
      }

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
